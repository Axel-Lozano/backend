import { Router } from "express";
import CartManager from "../Manager/cartManager.js";
const cartRouter = Router();
const cartManager = new CartManager("./carts.json");



cartRouter.post("/" , async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

cartRouter.get("/:cid" , async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

cartRouter.post("/:cid/product/:pid" , async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

export default cartRouter;

