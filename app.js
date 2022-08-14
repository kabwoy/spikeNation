const express = require("express")
const mongoose = require("mongoose")
const moment = require("moment")
const methodOverride = require("method-override")
const postRoutes = require("./routes/post")
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use(express.static('public'))
app.set('view engine' , 'ejs')

app.use(postRoutes);

mongoose.connect("mongodb://localhost/spikeNation").then(()=>{
    console.log("Db Connected");
})



app.get('/' , (req,res)=>{

    res.send("Hello")
    
})





app.listen(3000 || process.env.PORT , function(){

    console.log("Listening At Port 3000")
})