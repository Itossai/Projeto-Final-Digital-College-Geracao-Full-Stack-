import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import jwt from 'jsonwebtoken';

for (const variable of ['MYSQL_DATABASE', 'MYSQL_USER', 'MYSQL_PASSWORD']) {
  if (process.env[variable] === undefined) {
    process.env[variable] = 'test';
  }
}

if (process.env.JWT_SECRET === undefined) {
  process.env.JWT_SECRET = 'test-jwt-secret';
}

const jwtSecret = process.env.JWT_SECRET;

const [{ default: app }, { User, sequelize }] = await Promise.all([
  import('../src/app.js'),
  import('../src/models/index.js'),
]);

after(async () => {
  await sequelize.close();
});

async function request(path, options) {
  const server = app.listen(0);

  try {
    await new Promise((resolve) => server.once('listening', resolve));
    const { port } = server.address();
    return await fetch(`http://localhost:${port}${path}`, options);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

function requestUser(id) {
  return request(`/v1/user/${id}`);
}

function requestCreateUser(payload) {
  return request('/v1/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

function createUserToken(userId) {
  return jwt.sign({ sub: String(userId) }, jwtSecret, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
}

function requestUpdateUser(id, payload, token) {
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return request(`/v1/user/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload),
  });
}

function requestDeleteUser(id, token) {
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return request(`/v1/user/${id}`, {
    method: 'DELETE',
    headers,
  });
}

test('deletes the authenticated user and returns no content', async () => {
  const originalFindByPk = User.findByPk;
  let receivedId;
  let deleted = false;
  User.findByPk = async (id) => {
    receivedId = id;
    return {
      destroy: async () => {
        deleted = true;
      },
    };
  };

  try {
    const response = await requestDeleteUser(1, createUserToken(1));

    assert.equal(response.status, 204);
    assert.equal(await response.text(), '');
    assert.equal(receivedId, '1');
    assert.equal(deleted, true);
  } finally {
    User.findByPk = originalFindByPk;
  }
});

test('returns 401 when delete authentication is missing or belongs to another user', async () => {
  const invalidRequests = [
    { token: undefined, id: 1 },
    { token: 'not-a-jwt', id: 1 },
    { token: createUserToken(2), id: 1 },
  ];

  for (const { token, id } of invalidRequests) {
    const response = await requestDeleteUser(id, token);

    assert.equal(response.status, 401);
  }
});

test('returns 404 when an authenticated user to delete does not exist', async () => {
  const originalFindByPk = User.findByPk;
  User.findByPk = async () => null;

  try {
    const response = await requestDeleteUser(999, createUserToken(999));

    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { error: 'User not found' });
  } finally {
    User.findByPk = originalFindByPk;
  }
});

test('updates the authenticated user and returns no content', async () => {
  const originalFindByPk = User.findByPk;
  let receivedId;
  let updatedFields;
  User.findByPk = async (id) => {
    receivedId = id;
    return {
      update: async (fields) => {
        updatedFields = fields;
      },
    };
  };

  try {
    const response = await requestUpdateUser(
      1,
      {
        firstname: '  Ana  ',
        surname: ' Silva ',
        email: ' ana@example.com ',
      },
      createUserToken(1),
    );

    assert.equal(response.status, 204);
    assert.equal(await response.text(), '');
    assert.equal(receivedId, '1');
    assert.deepEqual(updatedFields, {
      firstname: 'Ana',
      surname: 'Silva',
      email: 'ana@example.com',
    });
  } finally {
    User.findByPk = originalFindByPk;
  }
});

test('returns 401 when the token is missing, invalid, or belongs to another user', async () => {
  const invalidRequests = [
    { token: undefined, id: 1 },
    { token: 'not-a-jwt', id: 1 },
    { token: createUserToken(2), id: 1 },
  ];

  for (const { token, id } of invalidRequests) {
    const response = await requestUpdateUser(
      id,
      { firstname: 'Ana', surname: 'Silva', email: 'ana@example.com' },
      token,
    );

    assert.equal(response.status, 401);
  }
});

test('returns 400 when update data is invalid', async () => {
  const originalFindByPk = User.findByPk;
  User.findByPk = async () => {
    throw new Error('User.findByPk should not be called for invalid data');
  };
  const validPayload = {
    firstname: 'Ana',
    surname: 'Silva',
    email: 'ana@example.com',
  };
  const invalidPayloads = [
    { ...validPayload, firstname: ' ' },
    { ...validPayload, email: 'invalid-email' },
  ];

  try {
    for (const payload of invalidPayloads) {
      const response = await requestUpdateUser(1, payload, createUserToken(1));

      assert.equal(response.status, 400);
      assert.deepEqual(await response.json(), { error: 'Invalid user data' });
    }
  } finally {
    User.findByPk = originalFindByPk;
  }
});

test('returns 404 when an authenticated user does not exist', async () => {
  const originalFindByPk = User.findByPk;
  User.findByPk = async () => null;

  try {
    const response = await requestUpdateUser(
      999,
      {
        firstname: 'Ana',
        surname: 'Silva',
        email: 'ana@example.com',
      },
      createUserToken(999),
    );

    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { error: 'User not found' });
  } finally {
    User.findByPk = originalFindByPk;
  }
});

test('creates a user and returns only public fields', async () => {
  const originalCreate = User.create;
  let createdUser;
  User.create = async (attributes) => {
    createdUser = attributes;
    return {
      id: 2,
      firstname: attributes.firstname,
      surname: attributes.surname,
      email: attributes.email,
    };
  };

  try {
    const response = await requestCreateUser({
      firstname: '  Ana  ',
      surname: ' Silva ',
      email: ' ana@example.com ',
      password: '123@123',
      confirmPassword: '123@123',
    });

    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), {
      id: 2,
      firstname: 'Ana',
      surname: 'Silva',
      email: 'ana@example.com',
    });
    assert.deepEqual(createdUser, {
      firstname: 'Ana',
      surname: 'Silva',
      email: 'ana@example.com',
      password: '123@123',
    });
  } finally {
    User.create = originalCreate;
  }
});

test('returns 400 for invalid user data', async () => {
  const originalCreate = User.create;
  User.create = async () => {
    throw new Error('User.create should not be called for invalid data');
  };
  const validPayload = {
    firstname: 'Ana',
    surname: 'Silva',
    email: 'ana@example.com',
    password: '123@123',
    confirmPassword: '123@123',
  };
  const invalidPayloads = [
    { ...validPayload, firstname: ' ' },
    { ...validPayload, email: 'invalid-email' },
    { ...validPayload, confirmPassword: 'different' },
  ];

  try {
    for (const payload of invalidPayloads) {
      const response = await requestCreateUser(payload);

      assert.equal(response.status, 400);
      assert.deepEqual(await response.json(), { error: 'Invalid user data' });
    }
  } finally {
    User.create = originalCreate;
  }
});

test('returns public user fields for an existing ID', async () => {
  const originalFindByPk = User.findByPk;
  let receivedId;
  let receivedOptions;
  User.findByPk = async (id, options) => {
    receivedId = id;
    receivedOptions = options;
    return {
      id: 1,
      firstname: 'Ana',
      surname: 'Silva',
      email: 'ana@example.com',
    };
  };

  try {
    const response = await requestUser(1);

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      id: 1,
      firstname: 'Ana',
      surname: 'Silva',
      email: 'ana@example.com',
    });
    assert.equal(receivedId, '1');
    assert.deepEqual(receivedOptions.attributes, [
      'id',
      'firstname',
      'surname',
      'email',
    ]);
  } finally {
    User.findByPk = originalFindByPk;
  }
});

test('returns 404 when the user does not exist', async () => {
  const originalFindByPk = User.findByPk;
  User.findByPk = async () => null;

  try {
    const response = await requestUser(999);

    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { error: 'User not found' });
  } finally {
    User.findByPk = originalFindByPk;
  }
});
