const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        maxLength: 255,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        maxLength: 255,
        required: true,
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

postSchema.pre('validate', function(next) {
    this.set('slug', this.title.toLowerCase().replace(/[^\w-]+/g, '-')) 
    next()
})

postSchema.pre('findOneAndUpdate', function(next) {
     const updatedField = this.getUpdate()
     if(updatedField.title) {
         this.set('slug', updatedField.title.toLowerCase().replace(/[^\w-]+/g, '-')) 
     }
    next()
})

postSchema.plugin(uniqueValidator)

const Post = mongoose.model('Post', postSchema)

module.exports = Post
