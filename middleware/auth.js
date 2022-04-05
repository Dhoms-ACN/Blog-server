const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { TOKEN_KEY } = process.env


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim()
        const data = jwt.verify(token, TOKEN_KEY)
        const user = await User.findOne({ _id: data.id, 'tokens.token': token })
        if (!user) {
            throw new Error('User Not Found')
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ message: "Please Authenticate" })
    }
}


module.exports = auth
