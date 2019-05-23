import { createResponse } from 'lib/utils';
import {
  queryUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  findUser,
  getFollowers
} from 'services/users';

export function index(req, res, next) {
  queryUsers(req.query)
    .then(result => {
      res.json(createResponse(result));
    })
    .catch(next);
}

export function show(req, res, next) {
  getSingleUser(req.params.id)
    .then(user => {
      res.json(createResponse({ user }));
    })
    .catch(next);
}

export function create(req, res, next) {
  createUser(req.body)
    .then(user => {
      res.json(createResponse({ user }));
    })
    .catch(next);
}

export function update(req, res, next) {
  updateUser(req.params.id, req.body)
    .then(user => {
      res.json(createResponse({ user }));
    })
    .catch(next);
}

export function follow(req, res, next) {
  findUser({ username: req.body.user })
    .then(user => {
      return getSingleUser(req.user._id).then(current => {
        current.following.push(user.id);
        return current.save();
      });
    })
    .then(_ => {
      res.json(createResponse(null, 'Success'));
    })
    .catch(next);
}

export function following(req, res, next) {
  getSingleUser(req.user._id)
    .then(user => {
      res.json(createResponse(user.following));
    })
    .catch(next);
}

export function followers(req, res, next) {
  getFollowers({ following: req.user._id })
    .then(users => {
      res.json(createResponse(users));
    })
    .catch(next);
}

export function destroy(req, res, next) {
  deleteUser(req.params.id)
    .then(user => user.delete(req.user._id))
    .then(() => {
      res.json(createResponse({}));
    })
    .catch(next);
}

export function getCurrentUser(req, res, next) {
  getSingleUser(req.user._id)
    .then(user => {
      res.json(createResponse({ user }));
    })
    .catch(next);
}

export function updateCurrentUser(req, res, next) {
  updateUser(req.user._id, req.body)
    .then(user => {
      res.json(createResponse({ user }));
    })
    .catch(next);
}
