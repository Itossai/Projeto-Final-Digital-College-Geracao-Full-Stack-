import * as userService from '../services/user.service.js';

const invalidUserData = (response) =>
  response.status(400).json({ error: 'Invalid user data' });

function isValidProfile(firstname, surname, email) {
  return (
    typeof firstname === 'string' &&
    firstname.trim().length > 0 &&
    typeof surname === 'string' &&
    surname.trim().length > 0 &&
    typeof email === 'string' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  );
}

export async function createUser(request, response) {
  const { firstname, surname, email, password, confirmPassword } =
    request.body || {};

  if (
    !isValidProfile(firstname, surname, email) ||
    typeof password !== 'string' ||
    password.length === 0 ||
    password !== confirmPassword
  ) {
    return invalidUserData(response);
  }

  const user = await userService.createUser({
    firstname: firstname.trim(),
    surname: surname.trim(),
    email: email.trim(),
    password,
  });

  return response.status(201).json({
    id: user.id,
    firstname: user.firstname,
    surname: user.surname,
    email: user.email,
  });
}

export async function getUserById(request, response) {
  const user = await userService.getUserById(request.params.id);

  if (!user) {
    return response.status(404).json({ error: 'User not found' });
  }

  return response.status(200).json(user);
}

export async function updateUser(request, response) {
  if (request.auth.userId !== request.params.id) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  const { firstname, surname, email } = request.body || {};

  if (!isValidProfile(firstname, surname, email)) {
    return invalidUserData(response);
  }

  const updated = await userService.updateUser(request.params.id, {
    firstname: firstname.trim(),
    surname: surname.trim(),
    email: email.trim(),
  });

  if (!updated) {
    return response.status(404).json({ error: 'User not found' });
  }

  return response.status(204).end();
}

export async function deleteUser(request, response) {
  if (request.auth.userId !== request.params.id) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  const deleted = await userService.deleteUser(request.params.id);

  if (!deleted) {
    return response.status(404).json({ error: 'User not found' });
  }

  return response.status(204).end();
}
