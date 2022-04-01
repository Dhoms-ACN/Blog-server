const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { TOKEN_KEY } = process.env


const auth = async(req, res, next) => {
    // const authHeader = req.header('Authorization')
    const data = jwt.verify(token, TOKEN_KEY)
    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}


module.exports = auth
