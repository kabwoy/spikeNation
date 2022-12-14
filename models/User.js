const mongoose = require("mongoose")

const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({

    username:{

        type:String,
        required:true
    },

    email:{

        type:String,
        required:true,
    },

    password:{

        type:String,
        required:true,
    }
})

userSchema.methods.generateAuthToken = function(){

    const token = jwt.sign({_id:this._id} , "kabwoy")

    return token
}

const User = mongoose.model('User' , userSchema)


module.exports = User