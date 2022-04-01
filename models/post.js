const mongoose = require('mongoose')
const beautifyUnique = require('mongoose-beautiful-unique-validation');

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

postSchema.plugin(beautifyUnique)

const Post = mongoose.model('Post', postSchema)

module.exports = Post
