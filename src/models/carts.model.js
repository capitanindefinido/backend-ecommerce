import mongoose, { Schema, mongo } from 'mongoose'

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    products:[
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: Number,
        },
    ]
})

cartsSchema.pre('findOne', function(){
    this.populate('products.product')
})

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)