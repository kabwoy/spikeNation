const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({

    title: String,
    
    content: String,

    image: String,

    createdat: {type: Date , default: Date.now},
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

