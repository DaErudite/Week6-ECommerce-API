require('dotenv').config()
const User = require('../models/User.js')
const { userValidation } = require ('../validations/user.validation.js');
const bcrypt= require('bcrypt')
const bCryptSalt =process.env.BCRYPT_SALT





// Create a new user
exports.create= (req,res)=>{
    console.log('it works')

    const { error } = userValidation(req.body);
    if (error){
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    User.findOne({ email: req.body.email }, (err,user)=>{
    if (user) {
        console.log(user)
       return res.status(400).json({
           msg:"email already exists"})
        } else {

   const user = new User(req.body);

// Save user in the database
user.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Error occurred."
        });
    });

};
})
}





// Retrieve all users
exports.findAll= (req, res) => {
    User.find()
    .then((result) => {
        res.send({users:result});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};



// Retrieve a single user with Id
exports.findOne= (req, res) => {
    User.findById(req.params.Id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.Id
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.Id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.Id
        });
    });
};

 
    


// Update a user names with userId
exports.updateName= (req, res) => {
    // Validate Request
    if(!req.body.firstName || !req.body.lastName) {
        return res.status(400).send({
            message: " user name can not be empty"
        });
    }
    
    // Find user name and update it with the request body
    User.findByIdAndUpdate(req.params.Id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.Id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.Id
            });                
        }
        return res.status(500).send({
            message: "Error updating user password with id " + req.params.Id
        });
    });
};






exports.updatePassword= (req, res) => {
    // Validate Request
    if(!req.body.password) {
        return res.status(400).send({
            message: " user passsword can not be empty"
        });
    }
    
    let saltRounds=Number(bCryptSalt)
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            User.findByIdAndUpdate(req.params.Id, {
                password: hash
            }, {new: true})
            .then(user => {
                if(!user) {
                    return res.status(404).send({
                        message: "user not found with id " + req.params.Id
                    });
                }
                res.send(user);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "user not found with id " + req.params.Id
                    });                
                }
                return res.status(500).send({
                    message: "Error updating user password with id " + req.params.Id
                });
            });
        });
    });
    
}






//Delete a user with Id
exports.delete= (req, res) => {
    User.findByIdAndRemove(req.params.Id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.Id
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.Id
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.Id
        });
    });
};

