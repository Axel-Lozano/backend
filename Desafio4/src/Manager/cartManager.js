import fs from "fs";

export default class CartManager{
    constructor(path){
        this.path = path;
    }

    async #getMaxId(){
        let maxId = 0;
        const products = await this.getAllCarts();
        products.map((car) => {
            if (car.id > maxId) maxId = car.id;
        });
        return maxId;
    }

    async getAllCarts(){
        try {
            if(fs.existsSync(this.path)){
                const carts = await fs.promises.readFile(this.path, "utf-8");
                const cartsJSON = JSON.parse(carts);
                return cartsJSON;
            } else {
                return [] ;
            }
        } catch (error) {
            console.log(error);
        }
    };

    async getCartsById(cid){
        try {
            const carts = await this.getAllCarts();
            const cart = carts.find((car) => car.id === cid);
            if (cart) {
                return cart;
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    };

    async createCart(){
        try {
            const cart = {
                id: await this.#getMaxId() + 1,
                products:[]
            };
            const cartsFile = await this.getAllCarts();
            cartsFile.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
            return cart;
        } catch (error) {
            console.log(error);
        }
    };

    async saveCarts(carts) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
        } catch (error) {
            console.log(error);
        }
    }

    async saveProductToCart(cid, pid) {
        try {
            const carts = await this.getAllCarts();
            const cartIndex = carts.findIndex((c) => c.id === cid);
            if (cartIndex >= 0) {
                const cart = carts[cartIndex];
                const prodIndex = cart.products.findIndex((p) => p.product === pid);
                if (prodIndex >= 0) {
                    cart.products[prodIndex].quantity++;
                } else {
                    cart.products.push({
                        product: pid,
                        quantity: 1
                    });
                }
                await this.saveCarts(carts);
                return cart;
            } else {
                throw new Error("Error: cart not found");
            }
        } catch (error) {
            console.log(error);
        }
    }
    // async savePruducttocart(cid, pid){
    //     try {
    //         const cart = await this.getCartsById(cid);
    //         if (cart) {
    //             const prodExistant = await cart.products.find(p => p.pid === pid)
    //             if (prodExistant) {
    //                 prodExistant.quantity ++
    //             }else{
    //                 cart.products.push(pid)
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}