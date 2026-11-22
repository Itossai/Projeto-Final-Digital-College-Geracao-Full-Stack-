import { Router } from 'express';
import requireAuth from '../middleware/require-auth.js';
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  searchCategories,
  updateCategory,
} from '../controllers/category.controller.js';

const router = Router();

router.post('/', requireAuth, createCategory);
router.get('/search', searchCategories);
router.put('/:id', requireAuth, updateCategory);
router.delete('/:id', requireAuth, deleteCategory);
router.get('/:id', getCategoryById);

export default router;
