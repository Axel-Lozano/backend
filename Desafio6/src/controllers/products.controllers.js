import {
    getAllProductService,
    getProductByIdService,
    createProductService,
    updateProductService,
    deleteProductService,
} from "../services/products.services.js";



export const getAllProductController = async (req, res, next) => {
    try {
        const docs = await getAllProductService();
        res.json(docs);
    } catch (error) {
        next(error);
    }
};

export const getProductByIdController = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const doc = await getProductByIdService(id);
        res.json(doc);
    } catch (error) {
        next(error);
    }
};

export const createProductController = async (req, res, next) => {
    try {
        const {
            title,
            description,
            price,
            stock,
            code
        } = req.body;
        const newDoc = await createProductService({
            title,
            description,
            price,
            stock,
            code
        });
        res.json(newDoc);
    } catch (error) {
        next(error);
    }
};

export const updateProductController = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const {
            title,
            description,
            price,
            stock,
            code
        } = req.body;
        await getProductByIdService(id);
        const docUpd = await updateProductService(id, {
            title,
            description,
            price,
            stock,
            code
        });
        res.json(docUpd);
    } catch (error) {
        next(error);
    }
};

export const deleteProductController = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        await deleteProductService(id);
        res.json({
            message: 'Product deleted successfully!'
        })
    } catch (error) {
        next(error);
    }
};