const express = require('express')
const User = require('../models/user')
const userRouter = new express.Router()
const jwt = require('jsonwebtoken')



userRouter.post('/sign-in', async (req, res) => {
    try{
        const user = await new User(req.body).save()
        const token = await user.generateToken()
        res.json({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
    
})

userRouter.post('/login', async (req, res) => {
   try {
        const user = await User.findByCredentials(req.body)
        if(! user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateToken()
        res.send({user, token})
   } catch (e) {
       res.status(400).send(e)
   }
})



module.exports = userRouter