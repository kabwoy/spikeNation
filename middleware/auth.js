
function auth(req,res,next){
    if(!req.session.isAuthenticated){

        res.redirect("/users/login")
    }else{

        next()

        
    }


}

module.exports = auth