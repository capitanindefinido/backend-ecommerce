import mongoose, { Schema, mongo } from 'mongoose'

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    products:{
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {type: Number}
        }]
    }
})

/* cartsSchema.pre('findOne', function(){
    this.populate('products.product')
}) */

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)