import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import defineUserModel from '../src/models/user.js';

const sequelize = new Sequelize('test_database', 'test_user', 'test_password', {
  dialect: 'mysql',
  logging: false,
});
const User = defineUserModel(sequelize);

after(async () => {
  await sequelize.close();
});

test('defines required user fields and database timestamp columns', () => {
  const attributes = User.getAttributes();

  assert.equal(attributes.id.type.key, 'INTEGER');
  assert.equal(attributes.id.primaryKey, true);
  assert.equal(attributes.id.autoIncrement, true);

  for (const field of ['firstname', 'surname', 'email', 'password']) {
    assert.equal(attributes[field].type.key, 'STRING');
    assert.equal(attributes[field].allowNull, false);
  }

  assert.equal(User.tableName, 'users');
  assert.equal(User.options.timestamps, true);
  assert.equal(attributes.createdAt.field, 'created_at');
  assert.equal(attributes.updatedAt.field, 'updated_at');
});

test('hashes a user password before saving', async () => {
  const password = 'plain-text-password';
  const user = User.build({
    firstname: 'Ana',
    surname: 'Silva',
    email: 'ana@example.com',
    password,
  });

  await User.runHooks('beforeSave', user);

  assert.notEqual(user.password, password);
  assert.equal(await bcrypt.compare(password, user.password), true);
});
