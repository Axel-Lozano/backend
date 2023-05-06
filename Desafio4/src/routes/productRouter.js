import { Router } from "express";
import ProductManager from "../Manager/productManager.js";
const prodRouter = Router();

const productManager = new ProductManager("./products.json");

prodRouter.get("/", async(req, res) =>  {
    try {
        const {limit} = req.query;
        const products = await productManager.getAllProducts(limit);
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({message: error.message});
        console.log(error);
    }
})

prodRouter.get('/:pid', async(req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductsById(Number(pid));
        if(product){
            res.status(200).json({ message: 'Product found', product })
        } else {
            res.status(400).send('product not found')
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

prodRouter.post('/', async (req, res)=>{
    try {
        console.log(req.body);
        const product = req.body;
        const newProduct = await productManager.createProduct(product);
        res.json(newProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

prodRouter.put('/:pid', async(req, res) => {
    try {
        const product = req.body;
        const { pid } = req.params;
        const productFile = await productManager.getProductsById(Number(pid));
        if(productFile){
            await productManager.updateProduct(product, Number(pid));
            res.send(`product updated successfully!`);
        } else {
            res.status(404).send('product not found')
        }
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
});

prodRouter.delete('/:pid', async(req, res)=>{
    try {
        const { pid } = req.params;
        const products = await productManager.getAllProducts();
        if(products.length > 0){
            await productManager.deleteProductById(Number(pid));
            res.send(`product id: ${pid} deleted successfully`);
        } else {
            res.send(`product id: ${pid} not found`);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
});

prodRouter.delete('/', async(req, res)=>{
    try {
        await productManager.deleteAllProducts();
        res.send('products deleted successfully')
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
});

export default prodRouter;