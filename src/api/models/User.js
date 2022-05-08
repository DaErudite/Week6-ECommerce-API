const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamp:true}
);

userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password, salt)
    next();
})

userSchema.post('save', function(doc,next){
    console.log('a new user was created and saved', doc)
    next();
})



const User = mongoose.model('User', userSchema);
module.exports = User;