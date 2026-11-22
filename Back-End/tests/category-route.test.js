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

const [{ default: app }, { Category, sequelize }] = await Promise.all([
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

function createCategoryToken() {
  return jwt.sign({ sub: '1' }, jwtSecret, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
}

function requestCreateCategory(payload, token) {
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return request('/v1/category', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
}

function requestUpdateCategory(id, payload, token) {
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return request(`/v1/category/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload),
  });
}

function requestDeleteCategory(id, token) {
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return request(`/v1/category/${id}`, {
    method: 'DELETE',
    headers,
  });
}

test('creates a category with a valid token', async () => {
  const originalCreate = Category.create;
  let createdAttributes;
  Category.create = async (attributes) => {
    createdAttributes = attributes;
    return {
      id: 2,
      ...attributes,
      use_in_menu: attributes.use_in_menu ?? false,
    };
  };

  try {
    const response = await requestCreateCategory(
      { name: ' Shoes ', slug: ' shoes ', use_in_menu: true },
      createCategoryToken(),
    );

    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), {
      id: 2,
      name: 'Shoes',
      slug: 'shoes',
      use_in_menu: true,
    });
    assert.deepEqual(createdAttributes, {
      name: 'Shoes',
      slug: 'shoes',
      use_in_menu: true,
    });
  } finally {
    Category.create = originalCreate;
  }
});

test('returns 401 when category creation has no valid token', async () => {
  const invalidTokens = [undefined, 'not-a-jwt'];

  for (const token of invalidTokens) {
    const response = await requestCreateCategory(
      { name: 'Shoes', slug: 'shoes', use_in_menu: true },
      token,
    );

    assert.equal(response.status, 401);
  }
});

test('returns 400 for invalid category data', async () => {
  const originalCreate = Category.create;
  Category.create = async () => {
    throw new Error('Category.create should not be called for invalid data');
  };
  const invalidPayloads = [
    { name: ' ', slug: 'shoes', use_in_menu: true },
    { name: 'Shoes', slug: '', use_in_menu: true },
    { name: 'Shoes', slug: 'shoes', use_in_menu: 'true' },
  ];

  try {
    for (const payload of invalidPayloads) {
      const response = await requestCreateCategory(
        payload,
        createCategoryToken(),
      );

      assert.equal(response.status, 400);
      assert.deepEqual(await response.json(), {
        error: 'Invalid category data',
      });
    }
  } finally {
    Category.create = originalCreate;
  }
});

test('updates a category and returns no content', async () => {
  const originalFindByPk = Category.findByPk;
  let receivedId;
  let updatedAttributes;
  Category.findByPk = async (id) => {
    receivedId = id;
    return {
      update: async (attributes) => {
        updatedAttributes = attributes;
      },
    };
  };

  try {
    const response = await requestUpdateCategory(
      1,
      { name: ' Shoes ', slug: ' shoes ', use_in_menu: true },
      createCategoryToken(),
    );

    assert.equal(response.status, 204);
    assert.equal(await response.text(), '');
    assert.equal(receivedId, '1');
    assert.deepEqual(updatedAttributes, {
      name: 'Shoes',
      slug: 'shoes',
      use_in_menu: true,
    });
  } finally {
    Category.findByPk = originalFindByPk;
  }
});

test('returns 401 when category update has no valid token', async () => {
  const invalidTokens = [undefined, 'not-a-jwt'];
  const validPayload = {
    name: 'Shoes',
    slug: 'shoes',
    use_in_menu: true,
  };

  for (const token of invalidTokens) {
    const response = await requestUpdateCategory(1, validPayload, token);

    assert.equal(response.status, 401);
  }
});

test('returns 400 for invalid category update data', async () => {
  const originalFindByPk = Category.findByPk;
  Category.findByPk = async () => {
    throw new Error('Category.findByPk should not be called for invalid data');
  };
  const invalidPayloads = [
    { name: ' ', slug: 'shoes', use_in_menu: true },
    { name: 'Shoes', slug: '', use_in_menu: true },
    { name: 'Shoes', slug: 'shoes', use_in_menu: 'true' },
    { name: 'Shoes', slug: 'shoes' },
  ];

  try {
    for (const payload of invalidPayloads) {
      const response = await requestUpdateCategory(
        1,
        payload,
        createCategoryToken(),
      );

      assert.equal(response.status, 400);
      assert.deepEqual(await response.json(), {
        error: 'Invalid category data',
      });
    }
  } finally {
    Category.findByPk = originalFindByPk;
  }
});

test('returns 404 when the category to update does not exist', async () => {
  const originalFindByPk = Category.findByPk;
  Category.findByPk = async () => null;

  try {
    const response = await requestUpdateCategory(
      999,
      { name: 'Shoes', slug: 'shoes', use_in_menu: true },
      createCategoryToken(),
    );

    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { error: 'Category not found' });
  } finally {
    Category.findByPk = originalFindByPk;
  }
});

test('deletes a category and returns no content', async () => {
  const originalFindByPk = Category.findByPk;
  let receivedId;
  let destroyed = false;
  Category.findByPk = async (id) => {
    receivedId = id;
    return {
      destroy: async () => {
        destroyed = true;
      },
    };
  };

  try {
    const response = await requestDeleteCategory(1, createCategoryToken());

    assert.equal(response.status, 204);
    assert.equal(await response.text(), '');
    assert.equal(receivedId, '1');
    assert.equal(destroyed, true);
  } finally {
    Category.findByPk = originalFindByPk;
  }
});

test('returns 401 when category deletion has no valid token', async () => {
  const invalidTokens = [undefined, 'not-a-jwt'];

  for (const token of invalidTokens) {
    const response = await requestDeleteCategory(1, token);

    assert.equal(response.status, 401);
  }
});

test('returns 404 when the category to delete does not exist', async () => {
  const originalFindByPk = Category.findByPk;
  Category.findByPk = async () => null;

  try {
    const response = await requestDeleteCategory(999, createCategoryToken());

    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { error: 'Category not found' });
  } finally {
    Category.findByPk = originalFindByPk;
  }
});

test('returns a category by ID with only public fields', async () => {
  const originalFindByPk = Category.findByPk;
  let receivedId;
  let receivedOptions;
  Category.findByPk = async (id, options) => {
    receivedId = id;
    receivedOptions = options;
    return {
      id: 1,
      name: 'Shoes',
      slug: 'shoes',
      use_in_menu: true,
    };
  };

  try {
    const response = await request('/v1/category/1');

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      id: 1,
      name: 'Shoes',
      slug: 'shoes',
      use_in_menu: true,
    });
    assert.equal(receivedId, '1');
    assert.deepEqual(receivedOptions.attributes, [
      'id',
      'name',
      'slug',
      'use_in_menu',
    ]);
  } finally {
    Category.findByPk = originalFindByPk;
  }
});

test('returns 404 when the category ID does not exist', async () => {
  const originalFindByPk = Category.findByPk;
  Category.findByPk = async () => null;

  try {
    const response = await request('/v1/category/999');

    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { error: 'Category not found' });
  } finally {
    Category.findByPk = originalFindByPk;
  }
});

test('returns categories with default pagination and public fields', async () => {
  const originalFindAndCountAll = Category.findAndCountAll;
  let receivedOptions;
  Category.findAndCountAll = async (options) => {
    receivedOptions = options;
    return {
      count: 13,
      rows: [{ id: 1, name: 'Shoes', slug: 'shoes', use_in_menu: true }],
    };
  };

  try {
    const response = await request('/v1/category/search');

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      data: [{ id: 1, name: 'Shoes', slug: 'shoes', use_in_menu: true }],
      total: 13,
      limit: 12,
      page: 1,
    });
    assert.deepEqual(receivedOptions.attributes, [
      'id',
      'name',
      'slug',
      'use_in_menu',
    ]);
    assert.equal(receivedOptions.limit, 12);
    assert.equal(receivedOptions.offset, 0);
  } finally {
    Category.findAndCountAll = originalFindAndCountAll;
  }
});

test('applies page, requested fields, and menu filter', async () => {
  const originalFindAndCountAll = Category.findAndCountAll;
  let receivedOptions;
  Category.findAndCountAll = async (options) => {
    receivedOptions = options;
    return { count: 4, rows: [{ name: 'Shoes', slug: 'shoes' }] };
  };

  try {
    const response = await request(
      '/v1/category/search?limit=2&page=2&fields=name,slug&use_in_menu=true',
    );

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      data: [{ name: 'Shoes', slug: 'shoes' }],
      total: 4,
      limit: 2,
      page: 2,
    });
    assert.deepEqual(receivedOptions.attributes, ['name', 'slug']);
    assert.deepEqual(receivedOptions.where, { use_in_menu: true });
    assert.equal(receivedOptions.limit, 2);
    assert.equal(receivedOptions.offset, 2);
  } finally {
    Category.findAndCountAll = originalFindAndCountAll;
  }
});

test('returns all matching categories when limit is -1', async () => {
  const originalFindAndCountAll = Category.findAndCountAll;
  let receivedOptions;
  Category.findAndCountAll = async (options) => {
    receivedOptions = options;
    return { count: 3, rows: [] };
  };

  try {
    const response = await request(
      '/v1/category/search?limit=-1&page=4&use_in_menu=false',
    );

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      data: [],
      total: 3,
      limit: -1,
      page: 1,
    });
    assert.deepEqual(receivedOptions.where, { use_in_menu: false });
    assert.equal('limit' in receivedOptions, false);
    assert.equal('offset' in receivedOptions, false);
  } finally {
    Category.findAndCountAll = originalFindAndCountAll;
  }
});

test('returns 400 for invalid search query parameters', async () => {
  const originalFindAndCountAll = Category.findAndCountAll;
  Category.findAndCountAll = async () => {
    throw new Error('Category.findAndCountAll should not be called');
  };

  const invalidQueries = [
    '?limit=0',
    '?limit=-2',
    '?limit=1.5',
    '?page=0',
    '?page=2x',
    '?fields=name,unknown',
    '?fields=name,,slug',
    '?use_in_menu=yes',
  ];

  try {
    for (const query of invalidQueries) {
      const response = await request(`/v1/category/search${query}`);

      assert.equal(response.status, 400, query);
      assert.deepEqual(await response.json(), {
        error: 'Invalid category query',
      });
    }
  } finally {
    Category.findAndCountAll = originalFindAndCountAll;
  }
});
