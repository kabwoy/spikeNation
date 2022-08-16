const express = require("express")

const bcrypt = require("bcryptjs")

const _ = require("lodash")

const User = require("../models/User")

const bcryptjs = require("bcryptjs")

const router = express.Router()

router.get("/users/signup" , (req,res)=>{

    res.render("users/signup")
})

router.post("/signup" , async(req,res)=>{

    const {username , email , password } = req.body

    const hashedPass = await bcrypt.hash(password,12)

    const user = new User({username:username , email:email , password:hashedPass})

    await user.save().then(()=>{
        res.redirect("/users/login")
    })
})

router.get("/users/login" , async(req,res)=>{

    res.render("users/login")
})

router.post("/login" , async(req,res)=>{

    const {email , password} = req.body

    const Verifiedemail = await User.findOne({email:email})

    if(!Verifiedemail) return res.status(400).send("Invalid Email")

    const Verifiedpassword = await bcrypt.compare(password , Verifiedemail.password)

    if(!Verifiedpassword) return res.status(400).send("Invalid Password")

    const token = Verifiedemail.generateAuthToken()

    router.use(function(req,res,next){

        req.user = token
    
        next()
    })

    res.redirect("/")

})

module.exports = router