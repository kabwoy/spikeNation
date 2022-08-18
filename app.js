const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const moment = require("moment")
const methodOverride = require("method-override")
const postRoutes = require("./routes/post")
const userRoutes = require("./routes/user")
const checkUser = require("./middleware/checkUser")
const Post = require("./models/Post")
const User = require("./models/User")
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use(express.static('public'))
app.set('view engine' , 'ejs')
app.use(session({
    secret:'kaboi',
    saveUninitialized:false,
    resave:false,
}))

app.use(userRoutes);
app.use(checkUser);
app.use(postRoutes);

mongoose.connect("mongodb://localhost/spiceBlog").then(()=>{
    
    console.log("Db Connected");
})


app.get('/' , async(req,res)=>{

    // const result = await Post.find().populate('tag')
    // // console.log(result);
   res.send(req.session._id)
    
    
})

app.listen(3000 || process.env.PORT , function(){

    console.log("Listening At Port 3000")
})