import { Router } from "express";
import { cartsModel } from "../models/carts.model.js";
import CartManagerMongo from "../DAO/Mongo/cartsManager.js";

const CartRouter = Router();
const serviceCarts = new CartManagerMongo();

// cre
// traer un carrito por id
CartRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  // const cart = await cartModel.findOne({_id:'651c3fe98e5062e4fb9090ec'})
  const cart = await serviceCarts.getCartBy({ _id: cid });
  // const cart = await cartModel.findOne({_id:'651c3fe98e5062e4fb9090ec'}).populate('products.product')
  // console.log(cart.products)
  res.send({
    status: "success",
    payload: cart,
  });
});

CartRouter.post("/", async (req, res) => {
  let newCart = await serviceCarts.createCart();
  res.send({
    status: "success",
    payload: newCart,
  });
});

// /api/carts - PUT - /:cid/products/:pid
CartRouter.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  // if (!cart) {
  //     // return res
  // }

  const result = await serviceCarts.addProducToCart({ cid, pid, quantity });
  // console.log(result)
  res.send({ status: "success", payload: "result" });
});
// /api/carts - delete - /:cid/products/pid
CartRouter.delete("/:cid/products/:pid", async (req, res) => {
  res.send({ status: "success", payload: "result" });
});

//  api/carts - PUT - /:cid
CartRouter.put("/:cid", async (req, res) => {});

// /api/carts - delete - /:cid
CartRouter.delete("/:cid", async (req, res) => {
  res.send({ status: "success", payload: "result" });
});

export default CartRouter;
