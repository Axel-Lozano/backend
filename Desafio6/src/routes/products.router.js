import {
    Router
} from 'express';
import {
    getAllProductController,
    getProductByIdController,
    createProductController,
    updateProductController,
    deleteProductController,
} from '../controllers/products.controllers.js';

const router = Router();

router.get('/', getAllProductController);
router.get('/:id', getProductByIdController);
router.post('/', createProductController);
router.put('/:id', updateProductController);
router.delete('/:id', deleteProductController);

export default router;