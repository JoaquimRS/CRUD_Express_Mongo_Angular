const mongoose = require("mongoose")
const slug = require("mongoose-slug-generator")

mongoose.plugin(slug);

const ProductSchema = mongoose.Schema({
    slug: {type: String, slug: "title"},
    category: String,
    title: {type: String, required: true},
    price: Number
})
module.exports = mongoose.model("Producto",ProductSchema)