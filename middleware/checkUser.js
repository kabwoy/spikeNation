const User = require("../models/User")
async function checkUser(req,res,next){
    
    if(req.session._id){

        const user = await User.findById(req.session._id).select('_id username email')

        req.user = user

        console.log(user)

        next()
        
    }else{

        console.log("no user logged in yet"); 
        
        next()

    }

}

module.exports = checkUser