const express = require("express")
const mongoose = require("mongoose")
const moment = require("moment")
const methodOverride = require("method-override")
const postRoutes = require("./routes/post")
const userRoutes = require("./routes/user")
const Post = require("./models/Post")
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use(express.static('public'))
app.set('view engine' , 'ejs')

app.use(userRoutes);
app.use(postRoutes);



mongoose.connect("mongodb://localhost/spiceBlog").then(()=>{
    
    console.log("Db Connected");
})

app.get('/' , async(req,res)=>{

    // const result = await Post.find().populate('tag')
    // // console.log(result);
   res.send(req.user)
    
    
})

app.listen(3000 || process.env.PORT , function(){

    console.log("Listening At Port 3000")
})