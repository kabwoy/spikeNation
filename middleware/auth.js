const jwt = require("jsonwebtoken")

function auth(req,res,next){

    const token = req.user


    if(!token) return res.status(401).send('Access denied')

    try{

        const decoded = jwt.verify(token , 'kabwoy')
        req.user = decoded;
        next()

    }catch(e){

        res.send(e.message)
    }
}

module.exports = auth