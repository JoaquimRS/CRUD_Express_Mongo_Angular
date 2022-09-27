const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var slug = require("slug");


const ProductSchema = mongoose.Schema({
  slug: {
    type: String,
    lowecase: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String
  },
  price: {
    type: Number
  },
  desc: {
    type: String
  }

});

ProductSchema.plugin(uniqueValidator, { message: "is already taken" });

ProductSchema.pre("validate", function (next) {
  if (!this.slug) {
    this.slugify();
  }
  next();
});

ProductSchema.methods.slugify = function () {
  this.slug =
    slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

ProductSchema.methods.toListJSONFor = function () {
  return {
    reference: this.reference,
    name_category: this.name_category,
    slug: this.slug,
    icon: this.icon
  };
};

module.exports = mongoose.model("Producto", ProductSchema);