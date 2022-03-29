const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
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

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
