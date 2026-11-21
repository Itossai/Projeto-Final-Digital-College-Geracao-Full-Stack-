import { sequelize } from '../config/database.js';
import defineUserModel from './user.js';
import defineCategoryModel from './category.js';
import defineProductModel from './product.js';
import defineProductImageModel from './product-image.js';
import defineProductOptionModel from './product-option.js';
import defineProductCategoryModel from './product-category.js';

export const User = defineUserModel(sequelize);
export const Category = defineCategoryModel(sequelize);
export const Product = defineProductModel(sequelize);
export const ProductImage = defineProductImageModel(sequelize);
export const ProductOption = defineProductOptionModel(sequelize);
export const ProductCategory = defineProductCategoryModel(sequelize);

Product.hasMany(ProductImage, {
  foreignKey: 'product_id',
  as: 'images',
  onDelete: 'CASCADE',
});
ProductImage.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product',
});
Product.hasMany(ProductOption, {
  foreignKey: 'product_id',
  as: 'options',
  onDelete: 'CASCADE',
});
ProductOption.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product',
});
Product.belongsToMany(Category, {
  through: ProductCategory,
  foreignKey: 'product_id',
  otherKey: 'category_id',
  as: 'categories',
});
Category.belongsToMany(Product, {
  through: ProductCategory,
  foreignKey: 'category_id',
  otherKey: 'product_id',
  as: 'products',
});

export { sequelize };
