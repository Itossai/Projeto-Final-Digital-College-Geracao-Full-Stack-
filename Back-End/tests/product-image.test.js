import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { Sequelize } from 'sequelize';
import defineProductImageModel from '../src/models/product-image.js';

const sequelize = new Sequelize('test_database', 'test_user', 'test_password', {
  dialect: 'mysql',
  logging: false,
});
const ProductImage = defineProductImageModel(sequelize);

after(async () => {
  await sequelize.close();
});

test('defines the product image fields and foreign key', () => {
  const attributes = ProductImage.getAttributes();

  assert.equal(attributes.id.type.key, 'INTEGER');
  assert.equal(attributes.id.primaryKey, true);
  assert.equal(attributes.id.autoIncrement, true);

  assert.equal(attributes.product_id.type.key, 'INTEGER');
  assert.equal(attributes.product_id.allowNull, false);
  assert.equal(attributes.product_id.references.model, 'products');
  assert.equal(attributes.product_id.references.key, 'id');

  assert.equal(attributes.enabled.type.key, 'BOOLEAN');
  assert.equal(attributes.enabled.allowNull, true);
  assert.equal(attributes.enabled.defaultValue, false);

  assert.equal(attributes.path.type.key, 'STRING');
  assert.equal(attributes.path.allowNull, false);

  assert.equal(ProductImage.tableName, 'product_images');
  assert.equal(ProductImage.options.timestamps, false);
});
