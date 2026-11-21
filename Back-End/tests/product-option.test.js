import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { Sequelize } from 'sequelize';
import defineProductOptionModel from '../src/models/product-option.js';

const sequelize = new Sequelize('test_database', 'test_user', 'test_password', {
  dialect: 'mysql',
  logging: false,
});
const ProductOption = defineProductOptionModel(sequelize);

after(async () => {
  await sequelize.close();
});

test('defines product option fields, enum values and foreign key', () => {
  const attributes = ProductOption.getAttributes();

  assert.equal(attributes.id.type.key, 'INTEGER');
  assert.equal(attributes.id.primaryKey, true);
  assert.equal(attributes.id.autoIncrement, true);

  assert.equal(attributes.product_id.type.key, 'INTEGER');
  assert.equal(attributes.product_id.allowNull, false);
  assert.equal(attributes.product_id.references.model, 'products');
  assert.equal(attributes.product_id.references.key, 'id');

  assert.equal(attributes.title.type.key, 'STRING');
  assert.equal(attributes.title.allowNull, false);

  assert.equal(attributes.shape.type.key, 'ENUM');
  assert.deepEqual(attributes.shape.values, ['square', 'circle']);
  assert.equal(attributes.shape.allowNull, true);
  assert.equal(attributes.shape.defaultValue, 'square');

  assert.equal(attributes.radius.type.key, 'INTEGER');
  assert.equal(attributes.radius.allowNull, true);
  assert.equal(attributes.radius.defaultValue, 0);

  assert.equal(attributes.type.type.key, 'ENUM');
  assert.deepEqual(attributes.type.values, ['text', 'color']);
  assert.equal(attributes.type.allowNull, true);
  assert.equal(attributes.type.defaultValue, 'text');

  assert.equal(attributes.values.type.key, 'STRING');
  assert.equal(attributes.values.allowNull, false);

  assert.equal(ProductOption.tableName, 'product_options');
  assert.equal(ProductOption.options.timestamps, false);
});
