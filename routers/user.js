const express = require('express')
const user = require('../models/user')
const userRouter = new express.Router()


userRouter.post('/users', (req, res) => {
    res.send('testing users create')
})

module.exports = userRouter