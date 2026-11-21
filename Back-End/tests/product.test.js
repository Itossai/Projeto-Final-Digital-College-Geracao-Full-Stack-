import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { Sequelize } from 'sequelize';
import defineProductModel from '../src/models/product.js';

const sequelize = new Sequelize('test_database', 'test_user', 'test_password', {
  dialect: 'mysql',
  logging: false,
});
const Product = defineProductModel(sequelize);

after(async () => {
  await sequelize.close();
});

test('defines required product fields and database timestamp columns', () => {
  const attributes = Product.getAttributes();

  assert.equal(attributes.id.type.key, 'INTEGER');
  assert.equal(attributes.id.primaryKey, true);
  assert.equal(attributes.id.autoIncrement, true);

  assert.equal(attributes.enabled.type.key, 'BOOLEAN');
  assert.equal(attributes.enabled.allowNull, true);
  assert.equal(attributes.enabled.defaultValue, false);

  for (const field of ['name', 'slug']) {
    assert.equal(attributes[field].type.key, 'STRING');
    assert.equal(attributes[field].allowNull, false);
  }

  assert.equal(attributes.use_in_menu.type.key, 'BOOLEAN');
  assert.equal(attributes.use_in_menu.allowNull, true);
  assert.equal(attributes.use_in_menu.defaultValue, false);

  assert.equal(attributes.stock.type.key, 'INTEGER');
  assert.equal(attributes.stock.allowNull, true);
  assert.equal(attributes.stock.defaultValue, 0);

  assert.equal(attributes.description.type.key, 'STRING');
  assert.equal(attributes.description.allowNull, true);

  assert.equal(attributes.price.type.key, 'FLOAT');
  assert.equal(attributes.price.allowNull, false);
  assert.equal(attributes.price_with_discount.type.key, 'FLOAT');
  assert.equal(attributes.price_with_discount.allowNull, false);

  assert.equal(Product.tableName, 'products');
  assert.equal(Product.options.timestamps, true);
  assert.equal(attributes.createdAt.field, 'created_at');
  assert.equal(attributes.updatedAt.field, 'updated_at');
});
