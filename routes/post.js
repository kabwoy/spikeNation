const express = require("express")

const router = express.Router()

const moment = require("moment")

const Post = require("../models/Post")

router.get('/posts',(req,res)=>{

    Post.find({}).then((posts)=>{

        // const res = moment(posts.createdat).fromNow()

        res.render("posts/index",{posts:posts , moment:moment})
    })
})

router.get('/posts/new',(req,res)=>{
    
    res.render("posts/new")

})

router.post('/posts',(req,res)=>{

    const {title,content,image} = req.body

    const post = new Post({
        title:title,
        content:content,
        image:image
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

router.get('/posts/:id/edit',(req,res)=>{
        
        const {id} = req.params
        
        Post.findById(id).then((post)=>{
        
            res.render("posts/edit",{post:post})
        }).catch((err)=>{
        
            console.log(err)
        } )
    })

router.post('/posts/:id',(req,res)=>{
        
        const {id} = req.params
        const {title,content,image} = req.body
        
        Post.findByIdAndUpdate(id,{title:title,content:content,image:image}).then(()=>{
        
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