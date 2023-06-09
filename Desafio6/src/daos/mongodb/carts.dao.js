import { cartsModel } from "./models/carts.model.js";

export default class cartsDaoMongoDB {
    async getAllCarts(){
        try {
            const response = await cartsModel.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    async getCartsById(id){
        try {
            const response = await cartsModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    async createCart(){
        try {
            const response = await cartsModel.create({});
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    async addProductToCart(prodId, cartId){
        try {
            const cartFind = await cartsModel.findById(cartId)
            const existingProduct = await cartFind.products.find(productIt => productIt._id === prodId);
            if(existingProduct){
                const updatedQuantity = existingProduct.quantity + 1
                await cartsModel.updateOne(
                    {_id: cartId, 'products._id': prodId},
                    {$set: {'products.$.quantity': updatedQuantity}}
                );
            } else{
                await cartsModel.findOneAndUpdate(
                    {_id: cartId},
                    {$push: {products: {_id: prodId, quantity: 1}}},
                );
            };
            const cartUpdate = await cartsModel.findById(cartId)
            return cartUpdate
        } catch (error) {
            console.log(error)
        };
    };
    async deleteProductToCart (prodId, cartId){
        try {
            const cartFind = await cartsModel.findById(cartId);
            const existingProduct = await cartFind.products.find(productIt => productIt._id === prodId);
            if(!existingProduct){
                throw new Error('the product you are trying to remove does not exist')
            } else{
                if(existingProduct.quantity > 1){
                    const updatedQuantity = existingProduct.quantity - 1
                    await cartsModel.updateOne(
                        {_id: cartId, 'products._id': prodId},
                        {$set: {'products.$.quantity': updatedQuantity}}
                    );
                } else{
                    await cartsModel.findOneAndUpdate(
                        {_id: cartId},
                        {$pull: {products: {_id: prodId}}},
                    );
                };
            };
            const cartUpdate = await cartsModel.findById(cartId)
            return cartUpdate
        } catch (error) {
            console.log(error)
        };
    };
}