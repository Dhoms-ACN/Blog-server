const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const { HASH_SALT, TOKEN_KEY, TOKEN_EXPIRES } = process.env

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
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)   
            },
            message: () => "Email must be a valid email!"
        }
    },
    password: {
        type: String,
        trim: true,
        minLength: 8,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateToken = async function() {
    const { _id, email } = this
    const token = jwt.sign({id: _id, email }, TOKEN_KEY, { expiresIn: TOKEN_EXPIRES})
    this.tokens = this.tokens.concat({token})
    await this.save()   
    return token
}

userSchema.statics.findByCredentials = async function ({email, password}) {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    if(! bcrypt.compareSync(password, user.password)) {
        throw new Error({ error: 'Invalid login credentials' })
    }

    return user
}

userSchema.pre('save' , function (next) {
    if(this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, parseInt(HASH_SALT))
    }

    next()
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User