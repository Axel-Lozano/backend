import {getAllcartService, getCartsByIdService, createCartService, addProductToCartService, deleteProductToCartService  } from "../services/carts.services.js";


export const getAllCartController = async (req, res, next) => {
    try {
        const getAll = await getAllcartService();
        res.json(getAll);
    } catch (error) {
        next(error);
    }
};

export const getCartByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const getById = await getCartsByIdService(id);
        res.json(getById);
    } catch (error) {
        next(error);
    }
};

export const createCartController = async (req, res, next) => {
    try {
        const createCart = await createCartService();
        res.json(createCart);
    } catch (error) {
        next(error);
    }
};

export const addProductToCartController = async (req, res, next) => {
    try {
        const { prodId, cartId } = req.params;
        const addPTC = await addProductToCartService(prodId, cartId);
        res.json(addPTC);
    } catch (error) {
        next(error);
    }
};

export const deleteProductToCartController = async (req, res, next) => {
    try {
        const { prodId, cartId } = req.params;
        const dellPTC = await deleteProductToCartService(prodId, cartId);
        res.json({message: "Product deleted successfully!"},dellPTC);
    } catch (error) {
        next(error);
    }
};