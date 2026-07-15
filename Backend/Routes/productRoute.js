import express from 'express';

import { getProducts, createProduct, getProduct, updateProduct, deleteProduct } from '../Controllers/ProductController.js';
import userAuth from '../Middleware/UserAuth.js';
import upload from '../Middleware/upload.js';
const router= express.Router();

router.get('/', getProducts)
router.post('/', userAuth, upload.single("Image"), createProduct)
router.get('/:id', userAuth, getProduct)
router.put('/:id', userAuth, upload.single("Image"), updateProduct)
router.delete('/:id',userAuth, deleteProduct)

export default router;