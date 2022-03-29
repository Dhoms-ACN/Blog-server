const express = require('express')
const blog = require('../models/user')
const blogRouter = new express.Router()


blogRouter.post('/blogs', (req, res) => {
    res.send('testing blog create')
})

module.exports = blogRouter