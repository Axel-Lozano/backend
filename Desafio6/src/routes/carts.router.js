import {Router} from 'express';
import {
    getAllCartController,
    getCartByIdController,
    createCartController,
    addProductToCartController,
    ddeleteProductToCartController,
} from '../controllers/carts.controllers.js';

const router = Router();



export default router;