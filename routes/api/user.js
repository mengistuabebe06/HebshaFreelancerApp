const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/key')
const passport = require('passport')


//Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

//load the user model
const User = require('../../model/User')

//@routes GET api/users/test
//@desc test user routs
//@ access public
router.get('/test',(req,res)=>{
    res.json({mes:"user works"})
})
//@routes GET api/users/test
//@desc test user routs
router.post('/register',(req,res)=>{
    const { errors, isValid} = validateRegisterInput(req.body)

    //check validation
    if(!isValid){
        return res.status(400).json(errors)
    }
    
    User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                return res.status(400).json({email:'Email already exits'})
            }else{
                const avatar = gravatar.url(req.body.email,{
                    s:'200', //size
                    r:'pg', //Rating
                    d:'mm' //defualt

                })
                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar,
                    password:req.body.password
                });

                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err
                        newUser.password = hash
                        newUser.save()
                            .then(user=> res.json(user))
                            .catch(err=>console.log(err))
                    })
                })

            }
        })
})
//@routes GET api/users/login
//@desc login user / return JWT Token

router.post('/login',(req,res)=>{
    const { errors, isValid} = validateLoginInput(req.body)

    //check validation
    if(!isValid){
        return res.status(400).json(errors)
    }
//stop here 11:10

    const email = req.body.email
    const password = req.body.password

    //find the user by email
    User.findOne({email})
        .then(user=>{
            //check for the user
            if(!user){
                return res.status(400).json({email:"user is not found in the database"})
            }
            //check password
            bcrypt.compare(password,user.password).then(isMatch =>{
                if(isMatch){
                    //User matched
                    const payload = {id: user.id, name: user.name, avatar: user.avatar, }
                    //sign Token
                    jwt.sign(payload, keys.secretorkey,{expiresIn: 7200}, (err,token)=>{
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    })
                    // res.json({msg:"success"})
                }else{
                    return res.status(400).json({password:"password Incorrect"})
                }
            })
        })
})
//@routes GET api/users/current
//@desc return the current user
//@access private
router.get('/current',passport.authenticate('jwt',{session: false}),(req,res)=>{
    // res.json({msg:'success'})
    // this is used to return the email and password for login using token
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = router;