const { Product } = require("../../models/index")


exports.findAll = (req, res) => {
    Product.find()
    .then(data => {
      res.send(data);
    }).catch(err =>{
      res.status(500).send({
        message:
          err.message || "Some error occcurred while retrieving tutorials"
      })
    })
  };