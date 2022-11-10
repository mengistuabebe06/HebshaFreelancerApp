const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

//load profile model
const Profile = require('../../model/Profile')
//load user profile
const User = require('../../model/User')

//@routes GET api/profile/test
router.get('/test',(req,res)=>{
    res.json({mes:"profile works"})
})

//@routes GET api/profile
//@desc  GET current users profile
//@access private

router.get('/',passport.authenticate('jwt', {session: false}), (req,res)=>{

    Profile.findOne({ user: req.user.id})
        .then(profile =>{
            if(!profile){
                return res.status(404).json('There is no profile for this user')
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

module.exports = router;