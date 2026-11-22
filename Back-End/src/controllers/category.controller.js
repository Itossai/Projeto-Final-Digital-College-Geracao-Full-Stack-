import * as categoryService from '../services/category.service.js';

const allowedFields = new Set(['id', 'name', 'slug', 'use_in_menu']);

export async function createCategory(request, response) {
  const { name, slug, use_in_menu } = request.body || {};

  if (
    typeof name !== 'string' ||
    name.trim().length === 0 ||
    typeof slug !== 'string' ||
    slug.trim().length === 0 ||
    (use_in_menu !== undefined && typeof use_in_menu !== 'boolean')
  ) {
    return response.status(400).json({ error: 'Invalid category data' });
  }

  const attributes = { name: name.trim(), slug: slug.trim() };

  if (use_in_menu !== undefined) {
    attributes.use_in_menu = use_in_menu;
  }

  const category = await categoryService.createCategory(attributes);

  return response.status(201).json({
    id: category.id,
    name: category.name,
    slug: category.slug,
    use_in_menu: category.use_in_menu,
  });
}

function parseInteger(value, defaultValue) {
  if (value === undefined) {
    return defaultValue;
  }

  if (typeof value !== 'string' || !/^-?\d+$/.test(value)) {
    return null;
  }

  const parsedValue = Number(value);
  return Number.isSafeInteger(parsedValue) ? parsedValue : null;
}

function parseFields(value) {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== 'string') {
    return null;
  }

  const fields = value.split(',').map((field) => field.trim());

  if (
    fields.some(
      (field) => field.length === 0 || !allowedFields.has(field),
    )
  ) {
    return null;
  }

  return [...new Set(fields)];
}

export async function getCategoryById(request, response) {
  const category = await categoryService.getCategoryById(request.params.id);

  if (!category) {
    return response.status(404).json({ error: 'Category not found' });
  }

  return response.status(200).json(category);
}

export async function updateCategory(request, response) {
  const { name, slug, use_in_menu } = request.body || {};

  if (
    typeof name !== 'string' ||
    name.trim().length === 0 ||
    typeof slug !== 'string' ||
    slug.trim().length === 0 ||
    typeof use_in_menu !== 'boolean'
  ) {
    return response.status(400).json({ error: 'Invalid category data' });
  }

  const updated = await categoryService.updateCategory(request.params.id, {
    name: name.trim(),
    slug: slug.trim(),
    use_in_menu,
  });

  if (!updated) {
    return response.status(404).json({ error: 'Category not found' });
  }

  return response.status(204).end();
}

export async function deleteCategory(request, response) {
  const deleted = await categoryService.deleteCategory(request.params.id);

  if (!deleted) {
    return response.status(404).json({ error: 'Category not found' });
  }

  return response.status(204).end();
}

export async function searchCategories(request, response) {
  const limit = parseInteger(request.query.limit, 12);
  const requestedPage = parseInteger(request.query.page, 1);
  const fields = parseFields(request.query.fields);
  const useInMenuValue = request.query.use_in_menu;

  if (
    limit === null ||
    (limit !== -1 && limit < 1) ||
    requestedPage === null ||
    requestedPage < 1 ||
    fields === null ||
    (useInMenuValue !== undefined &&
      useInMenuValue !== 'true' &&
      useInMenuValue !== 'false')
  ) {
    return response.status(400).json({ error: 'Invalid category query' });
  }

  const result = await categoryService.searchCategories({
    limit,
    page: requestedPage,
    fields,
    useInMenu:
      useInMenuValue === undefined ? undefined : useInMenuValue === 'true',
  });

  return response.status(200).json(result);
}
