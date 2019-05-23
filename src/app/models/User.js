import mongoose, { Schema } from 'mongoose';

import BaseSchema from 'model/BaseSchema';
import { hashPassword, generateSalt } from 'lib/security';

const UserSchema = BaseSchema.extend(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    following: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
      default: []
    },
    _password: {
      hash: {
        type: String,
        required: true
      },
      salt: {
        type: String,
        required: true
      },
      hashed: {
        type: Boolean,
        default: false
      }
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        Reflect.deleteProperty(ret, '_id');
        Reflect.deleteProperty(ret, '__v');
        Reflect.deleteProperty(ret, '_password');
        Reflect.deleteProperty(ret, 'deleted');
        /* eslint-disable no-param-reassign */
        ret.id = doc._id;
        ret.fullName = doc.fullName;
      }
    }
  }
);

UserSchema.virtual('token').get(function() {
  return {
    _id: this._id,
    phone: this.phone
  };
});

UserSchema.virtual('fullName').get(function() {
  return `${this.firstName || ''} ${this.lastName || ''}`.trim() || undefined;
});

UserSchema.virtual('password').set(function(value) {
  this._password = {
    hash: value,
    salt: generateSalt(),
    hashed: false
  };
});

UserSchema.pre('validate', function(next) {
  this.constructor
    .exists({
      _id: { $ne: this._id },
      username: this.username
    })
    .then(exists => {
      if (exists) {
        next(new Error('Username already exists'));
      }
      next();
    });
});

UserSchema.pre('save', function(next) {
  if (this._password.hashed) {
    return next();
  }
  return hashPassword(this._password.hash, this._password.salt)
    .then(passwordHash => {
      this._password.hash = passwordHash;
      this._password.hashed = true;
      next();
    })
    .catch(next);
});

UserSchema.methods.verifyPassword = function(password) {
  return hashPassword(password, this._password.salt).then(
    passwordHash => this._password.hash === passwordHash
  );
};

export default mongoose.model('User', UserSchema);
