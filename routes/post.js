const express = require("express")

const router = express.Router()

const moment = require("moment")

const auth = require("../middleware/auth")

const Tag = require("../models/Tag")

const Post = require("../models/Post")

const User = require("../models/User")


router.get('/posts',(req,res)=>{

    Post.find({}).populate('tag').then(async(posts)=>{
        console.log(req.user)
        res.render("posts/index" , {posts , moment})
    })

})

router.get('/posts/new', auth, async(req,res)=>{

    const tags = await Tag.find({})

    if(req.session.isAuthenticated){
        // console.log(req.session.id)
        res.render("posts/new" , {tags})
    }else{

        res.send("login")
    }
    
    

})

router.post('/posts',(req,res)=>{

    const {title,content,image , tag } = req.body

    const post = new Post({
        title:title,
        content:content,
        image:image,
        tag:tag,
    })

    post.save().then(()=>{

        res.redirect("/posts")
    }).catch((err)=>{

        console.log(err)
    } )

})

router.get('/posts/:id',(req,res)=>{
    
        const {id} = req.params
    
        Post.findById(id).then((post)=>{

    
            res.render("posts/show",{post:post})
        }).catch((err)=>{
    
            console.log(err)
        } )
    })

router.get('/posts/:id/edit',async(req,res)=>{
        
        const {id} = req.params

        const tags = await Tag.find({})
        
        Post.findById(id).then((post)=>{
        
            res.render("posts/edit",{post:post , tags:tags})
        }).catch((err)=>{
        
            console.log(err)
        } )
    })

router.post('/posts/:id',(req,res)=>{
        
        const {id} = req.params
        const {title,content,image,tag} = req.body
        
        Post.findByIdAndUpdate(id,{title:title,content:content,image:image ,tag:tag}).then(()=>{
        
            res.redirect(`/posts/${id}`)
        }).catch((err)=>{
        
            console.log(err)
        })
    })

router.delete("/posts/:id" , async(req,res)=>{
    const {id} = req.params
    await Post.findByIdAndDelete(id)
    res.redirect("/posts")
})
module.exports = router