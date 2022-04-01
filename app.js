require('dotenv').config()
require('./database/mongoose')
const express = require('express')
const userRouter = require('./routers/user')
const postRouter = require('./routers/post')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use('/posts', postRouter)

module.exports = app
