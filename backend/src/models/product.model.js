const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
        id: Number,
        category: String,
        title: String,
        price: Number
    },{ 
        timestamps: true 
})
module.exports = mongoose.model("Producto",ProductSchema)