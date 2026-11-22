import { Category } from '../models/index.js';

const defaultAttributes = ['id', 'name', 'slug', 'use_in_menu'];

export function createCategory(attributes) {
  return Category.create(attributes);
}

export function getCategoryById(id) {
  return Category.findByPk(id, { attributes: defaultAttributes });
}

export async function updateCategory(id, attributes) {
  const category = await Category.findByPk(id);

  if (!category) {
    return false;
  }

  await category.update(attributes);
  return true;
}

export async function deleteCategory(id) {
  const category = await Category.findByPk(id);

  if (!category) {
    return false;
  }

  await category.destroy();
  return true;
}

export async function searchCategories({
  limit,
  page,
  fields,
  useInMenu,
}) {
  const options = {
    attributes: fields || defaultAttributes,
    order: [['id', 'ASC']],
  };

  if (useInMenu !== undefined) {
    options.where = { use_in_menu: useInMenu };
  }

  if (limit !== -1) {
    options.limit = limit;
    options.offset = (page - 1) * limit;
  }

  const { count, rows } = await Category.findAndCountAll(options);

  return {
    data: rows,
    total: count,
    limit,
    page: limit === -1 ? 1 : page,
  };
}
