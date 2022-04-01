const express = require('express')
const Post = require('../models/post')
const blogRouter = new express.Router()


blogRouter.post('/blogs', (req, res) => {
    res.send('testing blog create')
})

module.exports = blogRouter