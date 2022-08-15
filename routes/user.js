const express = require("express")

const router = express.Router()

router.get("/users/signup" , (req,res)=>{

    res.render("users/signup")
})

router.post("/signup" , async(req,res)=>{

    const {username , email , password } = req.body

    console.log(req.body);
})


module.exports = router