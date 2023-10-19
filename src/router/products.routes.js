import { Router } from "express";
import { productsModel } from "../models/products.model.js";
import ProductManagerMongo from "../DAO/Mongo/productManager.js";

const ProductRouter = Router();
const serviceProduct = new ProductManagerMongo();

//Actualizamos los productos http://localhost:8080/api/products/ con put mandando todos los datos menos el id
ProductRouter.put("/:id", async (req, res) => {
  let id = req.params.id;
  let updProd = req.body;
  res.send(await serviceProduct.updateProduct(id, updProd));
});
//Traemos los productos por el id http://localhost:8080/api/products/idproducto con get
ProductRouter.get("/:id", async (req, res) => {
  try {
    const prodId = req.params.id;
    const productDetails = await serviceProduct.getProductById(prodId);
    res.render("viewDetails", { product: productDetails });
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});
//Traemos los productos con parametros en url con http://localhost:8080/api/products?limit&page&sort con get
ProductRouter.get("/", async (req, res) => {
  try {
    const { limit = 1, page = 1, order = 1, description } = req.query;
    let filtro = description ? { description } : {};
    let products = await productsModel.paginate(filtro, {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: { price: parseInt(order) },
      lean: true,
    });
    if (!products) {
      res.send({ status: "error", error: "No se encontraron productos..." });
    }
    res.send({ status: "success", payload: products });
  } catch (error) {
    console.log(error);
  }
});

//Eliminamos los productos por id http://localhost:8080/api/products/idproducto con delete
ProductRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await serviceProduct.delProducts(id));
});
//Se agregan los productos entregando un json
ProductRouter.post("/", async (req, res) => {
  let newProduct = req.body;
  res.send(await serviceProduct.addProduct(newProduct));
});

export default ProductRouter;
