const express = require('express')
require('./database/mongoose')
const app = express()
const port = process.env.PORT || 3001


app.listen(port, () => console.log(`App running on port ${port}`));