import mongoose, { mongo } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  description: { type: String, max: 100, required: true },
  image: { type: String, max: 100, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, max: 50 },
  availability: { type: String, enum: ["in_stock", "out_of_stock"] },
});

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, productsSchema);
