
import express from 'express';

import { getCategories, createCategory, getCategory, updateCategory, deleteCategory } from '../Controllers/CategoryController.js';
import userAuth from '../Middleware/UserAuth.js';
const router= express.Router();

router.get('/', getCategories)
router.post('/', createCategory)
router.get('/:id', getCategory)
router.put('/:id', userAuth,updateCategory)
router.delete('/:id', userAuth, deleteCategory)

export default router;