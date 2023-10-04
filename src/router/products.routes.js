import { Router } from "express";
import { productsModel } from "../models/products.model.js";

const ProductRouter = Router()

ProductRouter.get('/', async (req, res) => { 
    try {
        let products = await productsModel.find();
        res.send({ result: "success", payload: products });
    } catch (error) {
        console.log(error);
    }
});

ProductRouter.post('/', async (req, res) => {
    let { description, image, price, stock } = req.body;
    if (!description || !image || !price || !stock) {
        res.send({ status: "error", error: "Missing body params" });
    }
    let result = await productsModel.create({ description, image, price, stock });
    res.send({ result: "success", payload: result });
});

ProductRouter.put('/:id_prod', async (req, res) => {
    let { id_prod } = req.params;

    let productsToReplace = req.body;
    if (!productsToReplace.description || !productsToReplace.image || !productsToReplace.price || !productsToReplace.stock) {
        res.send({ status: "error", error: "Missing body params" });
    }
    let result = await productsModel.updateOne({ _id: id_prod }, productsToReplace);
    res.send({ result: "success", payload: result });
});


ProductRouter.delete('/:id_prod', async (req, res) => {
    let { id_prod } = req.params;
    let result = await productsModel.deleteOne({ _id: id_prod });
    res.send({ result: "success", payload: result });
});

export default ProductRouter