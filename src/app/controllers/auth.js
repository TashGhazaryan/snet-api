import passport from 'passport';

import { createJwtToken } from 'services/auth';
import { createUser } from 'services/users';

export function login(req, res, next) {
  passport.authenticate('local', (err, user) => {
    if (err) {
      res.status(500).json(err);
    }
    if (!user) {
      return next(new Error('Incorrect credentials. Authentication failed.'));
    }
    createLog({
      type: 'AUTH_LOGIN',
      user,
      meta: {
        success: true
      }
    });
    res.status(200).json({
      token: createJwtToken(user),
      user
    });
  })(req, res);
}

export function register(req, res, next) {
  createUser(req.body)
    .then(user => {
      res.status(201).json({
        token: createJwtToken(user),
        user
      });
    })
    .catch(next);
}
