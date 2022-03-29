const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        maxLength: 255,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        maxLength: 255,
        required: true
    },
    email: {
        type: String,
        trim: true,
        maxLength: 255,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 8,
        required: true
    }
})

const user = mongoose.model('users', userSchema)

module.exports = {
    user
}