const mongoose = require("mongoose");
const Tag = require("./Tag")
const postSchema = new mongoose.Schema({

    title: String,
    
    content: String,

    image: String,

    tag:{type:mongoose.Types.ObjectId , ref:'Tag'},

    createdat: {type: Date , default: Date.now},

});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

