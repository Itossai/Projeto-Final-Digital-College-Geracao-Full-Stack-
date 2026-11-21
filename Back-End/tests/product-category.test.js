import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { Sequelize } from 'sequelize';
import defineProductCategoryModel from '../src/models/product-category.js';

const sequelize = new Sequelize('test_database', 'test_user', 'test_password', {
  dialect: 'mysql',
  logging: false,
});
const ProductCategory = defineProductCategoryModel(sequelize);

after(async () => {
  await sequelize.close();
});

test('defines product and category foreign keys in the association table', () => {
  const attributes = ProductCategory.getAttributes();

  assert.equal(attributes.product_id.type.key, 'INTEGER');
  assert.equal(attributes.product_id.allowNull, false);
  assert.equal(attributes.product_id.primaryKey, true);
  assert.equal(attributes.product_id.references.model, 'products');
  assert.equal(attributes.product_id.references.key, 'id');

  assert.equal(attributes.category_id.type.key, 'INTEGER');
  assert.equal(attributes.category_id.allowNull, false);
  assert.equal(attributes.category_id.primaryKey, true);
  assert.equal(attributes.category_id.references.model, 'categories');
  assert.equal(attributes.category_id.references.key, 'id');

  assert.equal(ProductCategory.tableName, 'product_categories');
  assert.equal(ProductCategory.options.timestamps, false);
});
