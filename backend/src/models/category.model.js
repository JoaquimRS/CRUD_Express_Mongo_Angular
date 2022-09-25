const mongoose = require("mongoose")

const CategorySchema = mongoose.Schema({
        id: Number,
        name: String,
        desc: String
    },{ 
        timestamps: true 
})
module.exports = mongoose.model("Categoria",CategorySchema)