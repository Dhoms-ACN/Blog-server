const express = require('express')
const User = require('../models/user')
const userRouter = new express.Router()


userRouter.post('/sign-in', async (req, res) => {
    try{
        const user = await new User(req.body).save()
        res.json(user)
    } catch (e) {
        res.status(400).send(e)
    }
    
})



module.exports = userRouter