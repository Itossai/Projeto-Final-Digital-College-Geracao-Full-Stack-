import { Router } from 'express';
import requireAuth from '../middleware/require-auth.js';
import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/user.controller.js';

const router = Router();

router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', requireAuth, updateUser);
router.delete('/:id', requireAuth, deleteUser);

export default router;
