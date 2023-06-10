import cartsDaoMongoDB from "../daos/mongodb/carts.dao.js";
const cartDao = new cartsDaoMongoDB();

export const getAllcartService = async () => {
    try {
        const allCart = await cartDao.getAllcarts();
        return allCart;
    } catch (error) {
        console.log(error);
    }
};

export const getCartsByIdService = async (id) => {
    try {
        const cartById = await cartDao.getcartsById(id);
        if (!cartById) throw new Error('Product not found')
        else return cartById;
    } catch (error) {
        console.log(error);
    }
};

export const createCartService = async () => {
    try {
        const newCart = await cartDao.createCart();
        return newCart;
    } catch (error) {
        console.log(error);
    }
};

export const addProductToCartService = async (prodId, cartId) => {
    try {
        const addPTC = await cartDao.addProductToCart(prodId, cartId);
        return addPTC;
    } catch (error) {
        console.log(error);
    }
};

export const deleteProductToCartService = async (prodId, cartId) => {
    try {
        const dellPTC = await cartDao.deleteProductToCart(prodId, cartId);
        return dellPTC;
    } catch (error) {
        console.log(error);
    }
};