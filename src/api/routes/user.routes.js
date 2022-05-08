const express= require('express')
const users = require("../controllers/user.controller.js");
 const router= express.Router()

    // Register/Sign Up a new user
    router.post("/", users.create);
    // Retrieve all users
    router.get("/", users.findAll);
    // Retrieve a single user with id
    router.get("/:Id", users.findOne);
    // Update a user with id
    router.put("/:Id/updateName", users.updateName);
    // Update a user with id
    router.put("/:Id/updatePassword", users.updatePassword);
    // Delete a user with id
    router.delete("/:Id", users.delete);
    
module.exports= router    
  