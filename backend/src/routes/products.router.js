let router = require("express").Router()
const { products } = require("../controllers/index")

router.get("/",products.findAll);

module.exports = router;