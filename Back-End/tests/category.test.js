import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { Sequelize } from 'sequelize';
import defineCategoryModel from '../src/models/category.js';

const sequelize = new Sequelize('test_database', 'test_user', 'test_password', {
  dialect: 'mysql',
  logging: false,
});
const Category = defineCategoryModel(sequelize);

after(async () => {
  await sequelize.close();
});

test('defines required category fields and database timestamp columns', () => {
  const attributes = Category.getAttributes();

  assert.equal(attributes.id.type.key, 'INTEGER');
  assert.equal(attributes.id.primaryKey, true);
  assert.equal(attributes.id.autoIncrement, true);

  assert.equal(attributes.name.type.key, 'STRING');
  assert.equal(attributes.name.allowNull, false);
  assert.equal(attributes.slug.type.key, 'STRING');
  assert.equal(attributes.slug.allowNull, false);

  assert.equal(attributes.use_in_menu.type.key, 'BOOLEAN');
  assert.equal(attributes.use_in_menu.allowNull, true);
  assert.equal(attributes.use_in_menu.defaultValue, false);

  assert.equal(Category.tableName, 'categories');
  assert.equal(Category.options.timestamps, true);
  assert.equal(attributes.createdAt.field, 'created_at');
  assert.equal(attributes.updatedAt.field, 'updated_at');
});
