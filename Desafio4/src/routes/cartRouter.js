import { Router } from "express";
import CartManager from "../Manager/cartManager.js";
const cartRouter = Router();
const cartManager = new CartManager("./carts.json");



cartRouter.post('/', async (req, res)=>{
    try {
        console.log(req.body);
        const Cart = req.body;
        const newCart = await cartManager.createCart(Cart);
        res.json(newCart);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

cartRouter.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartsById(Number(cid));
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).send("Cart not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving cart");
    }
});

// cartRouter.get("/:cid" , async (req, res) => {
//     const {cid} = req.params
//     try {
//         const cartById = await cartManager.getCartsById(cid)
//         console.log(cartById);
//         res.status(200).json({
//             msg: 'product added',
//             payload: cartById})
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// })
cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const product = await cartManager.saveProductToCart(Number(cid), Number(pid));
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).send("Product or cart not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding product to cart");
    }
});
// cartRouter.post("/:cid/product/:pid" , async (req, res) => {
//     const {cid, pid} =  req.params
//     try {
//         const cart = await cartManager.saveProductToCart(cid, pid)
//         console.log(cart);
//         res.status(200).json({
//             msg: 'product added',
//             payload: cart
//         })
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// })

// cartRouter.post("/:cid/product/:pid" , async (req, res) => {
//     const {cid, pid} =  req.params
//     try {
//         const cart = cartManager.savePruducttocart(cid, pid)
//         res.status(200).json({
//             msg: 'product added',
//             payload: cart
//         })

export default cartRouter;

