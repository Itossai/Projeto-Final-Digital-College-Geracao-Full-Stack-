import { User } from '../models/index.js';

const publicAttributes = ['id', 'firstname', 'surname', 'email'];

export function getUserById(id) {
  return User.findByPk(id, { attributes: publicAttributes });
}

export function createUser(attributes) {
  return User.create(attributes);
}

export async function updateUser(id, attributes) {
  const user = await User.findByPk(id);

  if (!user) {
    return false;
  }

  await user.update(attributes);
  return true;
}

export async function deleteUser(id) {
  const user = await User.findByPk(id);

  if (!user) {
    return false;
  }

  await user.destroy();
  return true;
}
