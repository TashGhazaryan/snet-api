import { createResponse } from 'lib/utils';
import {
  getStatuses,
  createStatus,
  updateStatus,
  deleteStatus,
  getFollowingStatuses
} from 'services/status';
import { getSingleUser } from 'services/users';

export function get(req, res, next) {
  getStatuses(req.user._id)
    .then(status => {
      res.json(createResponse({ status }));
    })
    .catch(next);
}

export function create(req, res, next) {
  createStatus({ author: req.user._id, text: req.body.text })
    .then(status => {
      res.json(createResponse({ status }));
    })
    .catch(next);
}

export function update(req, res, next) {
  updateStatus(req.params.id, req.body)
    .then(status => {
      res.json(createResponse({ status }));
    })
    .catch(next);
}

export function destroy(req, res, next) {
  deleteStatus(req.params.id)
    .then(status => {
      res.json(createResponse({ status }));
    })
    .catch(next);
}

export function getFollowing(req, res, next) {
  return getSingleUser(req.user._id)
    .then(user => {
      return getFollowingStatuses(user.following);
    })
    .then(status => {
      res.json(createResponse({ status }));
    })
    .catch(next);
}
