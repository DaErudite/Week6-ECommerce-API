const express= require('express')
const products = require("../controllers/product.controller.js");
 const router= express.Router()

    // Create a new product instance
    router.post("/products", products.create);
    // Retrieve all products
    router.get("/products", products.findAll);
    // Retrieve a single product with id
    router.get("/products/:Id", products.findOne);
    // Update a product with id
    router.put("/products/:Id", products.update);
    // Delete a product with id
    router.delete("/products/:Id", products.delete);
    //filter through products array
    router.get("/api/filter", products.filterProduct);
    
module.exports= router    
  
  