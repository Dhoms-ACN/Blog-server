const express = require('express')
const Post = require('../models/post')
const auth = require('../middleware/auth')
const postRouter = new express.Router()


postRouter.get('/', async (req, res) => {
    try {
        const posts = await Post.find({})
        res.send(posts)
    } catch (e) {
        res.status(400).send(e)
    }
})

postRouter.post('/create', auth, async (req, res) => {
    try{
        const post = await new Post(req.body).save()
        res.send(post)
    }catch (e) {
        res.status(400).send(e)
    }
})

postRouter.get('/edit/:slug', auth, async (req, res) => {
    try {
        const post = await Post.find({slug: req.params.slug})
        if(post.length === 0) {
            return res.status(404).send()
        }
        res.send(post)
    }catch (e) {
        res.status(400).send(e)
    }
})

postRouter.put('/edit/:slug', auth, async (req, res) => {
      try {
        const query = {slug: req.params.slug}
        const post = await Post.findOneAndUpdate(query, {...req.body }, {returnDocument: 'after'})
        res.send(post)
    }catch (e) {
        res.status(400).send(e)
    }
})

postRouter.delete('/:id',  auth, async (req, res) => {
    await Post.deleteOne({ _id: req.params.id})
    res.status(204).send()
})


module.exports = postRouter