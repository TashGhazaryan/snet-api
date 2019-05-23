import User from 'model/User';
import { parseQueryOptions } from 'lib/utils';

export function queryUsers(params) {
  const options = parseQueryOptions(params);
  const query = {};

  return User.paginate(query, options).then(result => {
    const data = {
      ...result,
      users: result.docs
    };
    delete data.docs;
    return data;
  });
}

export function getSingleUser(id) {
  return User.findById(id);
}

export function findUser(data) {
  return User.findOne(data);
}

export function getFollowers(data) {
  return User.find(data);
}

export async function createUser(data, creator = null) {
  const createdById = creator ? creator._id : null;
  return User.create(data, createdById);
}

export function updateUser(id, data) {
  return User.findById(id).then(user => {
    user.mergeWithData(data);
    return user.save();
  });
}

export function deleteUser(id, deletedBy) {
  return User.findById(id).then(user => user.delete(deletedBy));
}
