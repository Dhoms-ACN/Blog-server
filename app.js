require('dotenv').config()
require('./database/mongoose')
const express = require('express')
const userRouter = require('./routers/user')
const blogRouter = require('./routers/blog')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(blogRouter)

module.exports = app
