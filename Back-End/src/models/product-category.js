import { DataTypes } from 'sequelize';

export default function defineProductCategoryModel(sequelize) {
  return sequelize.define(
    'ProductCategory',
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
    },
    {
      tableName: 'product_categories',
      timestamps: false,
      underscored: true,
    },
  );
}
