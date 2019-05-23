import mongoose, { Schema } from 'mongoose';

import BaseSchema from 'model/BaseSchema';

const StatusSchema = BaseSchema.extend(
  {
    text: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
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
export default mongoose.model('Status', StatusSchema);
