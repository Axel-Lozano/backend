import {Router} from 'express';
import {
    getAllCartController,
    getCartByIdController,
    createCartController,
    addProductToCartController,
    deleteProductToCartController,
} from '../controllers/carts.controllers.js';

const router = Router();

router.get('/', getAllCartController);
router.get('/:id', getCartByIdController);
router.post('/', createCartController);
router.put('/:cartId/:prodId', addProductToCartController);
router.delete('/:cartId/:prodId', deleteProductToCartController)

export default router;