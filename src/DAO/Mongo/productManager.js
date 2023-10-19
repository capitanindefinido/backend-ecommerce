import { productsModel } from "../../models/products.model.js";

class ProductManagerMongo extends productsModel {
  constructor() {
    super();
  }

  // Agrega un nuevo producto
  async addProduct(productData) {
    try {
      await productsModel.create(productData);
      return "Producto agregado";
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      return "Error al agregar el producto";
    }
  }

  // Actualiza un producto existente
  async updateProduct(id, productData) {
    try {
      const product = await ProductManagerMongo.findById(id);
      if (!product) {
        return "Producto no encontrado";
      }
      // Actualiza los campos del producto
      product.set(productData);

      await product.save();
      return "Producto actualizado";
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      return "Error al actualizar el producto";
    }
  }

  // Obtiene todos los productos
  async getProducts() {
    try {
      const products = await ProductManagerMongo.find({});
      return products;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      return [];
    }
  }

  // Obtiene un producto por ID
  async getProductById(id) {
    try {
      //La propiedad lean() arregla el error own properties que se muestra al momento de querer mostrar datos desde mongoose, ya que,
      //viene con propiedades propias de mongoose y lean() se las quita para quedar solo el json
      const product = await ProductManagerMongo.findById(id).lean();
      if (!product) {
        return "Producto no encontrado";
      }
      return product;
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      return "Error al obtener el producto";
    }
  }

  // Elimina un producto por ID
  async deleteProduct(id) {
    try {
      const product = await ProductManagerMongo.findById(id);
      if (!product) {
        return "Producto no encontrado";
      }

      await product.remove();
      return "Producto eliminado";
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      return "Error al eliminar el producto";
    }
  }
}

export default ProductManagerMongo;
