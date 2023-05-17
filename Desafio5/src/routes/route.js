import { Router } from "express";
import ProductManager from '../manager/productManager.js';
const productManager = new ProductManager("./products.json");

const router = Router();

router.get('/home', async (req, res) => {
    try {
        const productsFile = await productManager.getAllProducts()
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        if(limit){
            const limitedProducts = productsFile.slice(0, limit);
            const remainingProducts = productsFile.slice(limit); 
            res.status(200).render('home',{limitedProducts, remainingProducts});
        } else{
            res.status(200).render('home', {productsFile});
        };
    } catch (error) {
        res.status(404).json({ message: error.message });
    };
});

router.get('/', async (req, res) => {
    try {
        try {
            const productsFile = await productManager.getAllProducts()
            const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
            if(limit){
                const limitedProducts = productsFile.slice(0, limit);
                const remainingProducts = productsFile.slice(limit); 
                res.status(200).render('realTimeProducts',{limitedProducts, remainingProducts});
            } else{
                res.status(200).render('realTimeProducts', {productsFile});
            };
        } catch (error) {
            res.status(404).json({ message: error.message });
        };
    } catch (error) {
        res.status(404).json({ message: error.message });
    };
});

export default router;