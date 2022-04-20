const cors = require('cors')

const allowedOrigin = {
    origin: [ process.env.CLIENT_URL ]
}

cors(allowedOrigin)

module.exports = cors