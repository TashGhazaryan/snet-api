import Status from 'model/Status';

export function getStatuses(id) {
  return Status.find({ author: id });
}

export function getFollowingStatuses(users) {
  return Status.find({ author: users });
}

export function createStatus(data) {
  return Status.create(data);
}

export function updateStatus(id, data) {
  return Status.findById(id).then(status => {
    status.mergeWithData(data);
    return status.save();
  });
}

export function deleteStatus(id) {
  return Status.findById(id).then(status => status.delete());
}
