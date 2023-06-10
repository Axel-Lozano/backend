import ProductsDaoMongoDB from "../daos/mongodb/products.dao.js";
const prodDao = new ProductsDaoMongoDB();

// import ProductsDaoFS from "../daos/filesystem/products.dao.js";
// import { __dirname } from "../path.js";
// const prodDao = new ProductsDaoFS(__dirname+'/daos/filesystem/products.json');

export const getAllProductService = async () => {
    try {
        const docs = await prodDao.getAllProducts();
        return docs;
    } catch (error) {
        console.log(error);
    }
};

export const getProductByIdService = async (id) => {
    try {
        const doc = await prodDao.getProductById(id);
        if (!doc) throw new Error('Product not found')
        else return doc;
    } catch (error) {
        console.log(error);
    }
};

export const createProductService = async (obj) => {
    try {
        const newProd = await prodDao.createProduct(obj);
        if (!newProd) throw new Error('Validation Error!')
        else return newProd;
    } catch (error) {
        console.log(error);
    }
};

export const updateProductService = async (id, obj) => {
    try {
        const doc = await prodDao.getProductById(id);
        if (!doc) {
            throw new Error('Product not found')
        } else {
            const prodUpd = await prodDao.updateProduct(id, obj)
            return prodUpd;
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteProductService = async (id) => {
    try {
        const prodDel = await prodDao.deleteProductById(id);
        return prodDel;
    } catch (error) {
        console.log(error);
    }
};