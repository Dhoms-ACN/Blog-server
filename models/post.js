const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        maxLength: 255,
        required: true
    },
    excerpt: {
        type: String,
        trim: true,
        maxLength: 255,
        required: true
    },
    content: {
        type: String,
        trim: true,
    },
})

const Post = mongoose.model('Blog', postSchema)

module.exports = Post
