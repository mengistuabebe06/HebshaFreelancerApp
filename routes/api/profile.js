const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

//load profile validator
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')
//load profile model
const Profile = require('../../model/Profile')
//load user profile
const User = require('../../model/User')
const profile = require('../../validation/profile')

//@routes GET api/profile/test
// router.get('/test',(req,res)=>{
//     res.json({mes:"profile works"})
// })

//@routes GET api/profile
//@desc  GET current users profile
//@access private

router.get('/',passport.authenticate('jwt', {session: false}), (req,res)=>{

    Profile.findOne({ user: req.user.id})
        .populate('user',['name', 'avatar'])
        .then(profile =>{
            if(!profile){
                return res.status(404).json('There is no profile for this user')
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})
//@routes GET api/profile/handle/:handle
//@desc  Get the profile by handle
//@access public

router.get('/handle/:handle',(req,res)=>{
    const errors ={}

    Profile.findOne({handle: req.params.handle})
        .populate('user', ['name', 'avatar'])
        .then(profile =>{
            if(!profile){
                res.status(400).json('There is no profile for this user')
            }
            res.json(profile)
        })
        .catch(err=>{res.status(400).json({profile: 'There is no profile for this user'})})
})
//@routes GET api/profile/user/:user_id
//@desc  Get the profile by user ID
//@access public

router.get('/user/:user_id',(req,res)=>{
    const errors ={}

    Profile.findOne({user: req.params.user_id})
        .populate('user', ['name', 'avatar'])
        .then(profile =>{
            if(!profile){
                res.status(400).json('There is no profile for this user')
            }
            res.json(profile)
        })
        .catch(err=>{res.status(400).json(err)})
})

//@routes GET api/profile/all
//@desc  Get all profiles
//@access public

router.get('/all', (req,res)=>{
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles =>{
            if(!profiles){
                res.status(404).json({profiles: 'There are no profiles'})
            }

            res.json(profiles)
        })
        .catch(err=>{res.status(404).json({profiles:"There are no profiles"})})
})


//@routes post api/profile
//@desc  Create or edit user profile
//@access private

router.post('/',passport.authenticate('jwt', {session: false}), (req,res)=>{
const {errors, isValid} = validateProfileInput(req.body)

// check validation
if(!isValid){
    //return any errors with 400 status
    return res.status(400).json(errors)
}

    // code to get user profile filed
const profileFields = {}
profileFields.user = req.user.id
if(req.body.handle) profileFields.handle = req.body.handle
if(req.body.company) profileFields.company = req.body.company
if(req.body.website) profileFields.website = req.body.website
if(req.body.location) profileFields.location = req.body.location
if(req.body.bio) profileFields.bio = req.body.bio
if(req.body.status) profileFields.status = req.body.status
if(req.body.githubusername) profileFields.githubusername = req.body.githubusername

// skills - split into array

if(typeof req.body.skills !== 'undefined'){
    profileFields.skills = req.body.skills.split(',')
}

// Social

profileFields.social = {}
if(req.body.youtube) profileFields.social.youtube = req.body.youtube
if(req.body.twiter) profileFields.social.twiter = req.body.twiter
if(req.body.facebook) profileFields.social.facebook = req.body.facebook
if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
if(req.body.instagram) profileFields.social.instagram = req.body.instagram

Profile.findOne({user: req.user.id}).then(profile => {
    if(profile){
        //update the row
        Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
            .then(profile=> {res.json(profile)})

    }else{
        //create a new row [inorder]
        // check if the handle is exists
        Profile.findOne({handle: profileFields.handle})
            .then(profile=> {
                if(profile){
                    res.status(400).json('That handle already exitsts')
                }
                //save the profile
                new Profile(profileFields).save().then(profile=> {
                    res.json(profile)
                })
            })
    }
})
})
//@routes post api/profile/experience
//@desc  Create or edit experience profile
//@access private

router.post('/experience', passport.authenticate('jwt', {session: false}), async (req,res)=>{
    const {errors, isValid} = validateExperienceInput(req.body)

    // check validation
    if(!isValid){
        //return any errors with 400 status
        return res.status(400).json(errors)
    }
    try{
        const profile = await Profile.findOne({user: req.user.id});
        console.log("profile")
        console.log(profile)
        const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
            }
            console.log("newemp")
            console.log(newExp)
        profile.experience.unshift(newExp)

        await profile.save();

        res.json(profile);

    } catch(err){
        console.error(err.message);
        res.status(500).send('server put exp error')
    }
    // Profile.findOne({ user: req.user.id})
    //     .then(profile=> {
    //         const newExp = {
    //             title: req.body.title,
    //             company: req.body.company,
    //             location: req.body.location,
    //             from: req.body.from,
    //             to: req.body.to,
    //             current: req.body.current,
    //             description: req.body.description
    //         }
    //         //Add to the exp array
    //         profile.experience.unshift(newExp)

    //         profile.save().then(profile=> res.json(profile))
    //     })
})

//@routes post api/profile/education
//@desc  Create or edit education profile
//@access private

router.post('/education', passport.authenticate('jwt', {session: false}), (req,res)=>{
    const {errors, isValid} = validateEducationInput(req.body)

    // check validation
    if(!isValid){
        //return any errors with 400 status
        return res.status(400).json(errors)
    }
    Profile.findOne({ user: req.user.id})
        .then(profile=> {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                filedofstudy: req.body.filedofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }
            //Add to the exp array
            profile.education.unshift(newEdu)
            
            profile.save().then(profile=> res.json(profile))
            return 
        })
})


//@routes DELETE api/profile/experiance/:exp_id
//@desc  delete experinace from profile
//@access private

router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req,res)=>{

    Profile.findOne({ user: req.user.id})
        .then(profile=> {
            // get remove index
            const removeIndex  = profile.experience
                .map(item => item.id)
                .indexOf(req.params.exp_id)

                //splice out of array
                profile.experience.splice(removeIndex, 1)

                //save
                profile.save().then(profile=>res.json(profile))
        })
        .catch(err => res.status(404).json(err))
})

//@routes DELETE api/profile/education/:edu_id
//@desc  delete education from profile
//@access private

router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req,res)=>{

    Profile.findOne({ user: req.user.id})
        .then(profile=> {
            // get remove index
            const removeIndex  = profile.education
                .map(item => item.id)
                .indexOf(req.params.edu_id)

                //splice out of array
                profile.education.splice(removeIndex, 1)

                //save
                profile.save().then(profile=>res.json(profile))
        })
        .catch(err => res.status(404).json(err))
})

//@routes DELETE api/profile
//@desc  delete user and profile
//@access private
router.delete('/', passport.authenticate('jwt', {session: false}), (req,res)=>{
    Profile.findOneAndRemove({user: req.user.id})
        .then(()=>{
            //mathc the data base id of _id to the user ide
            User.findOneAndRemove({_id: req.user.id}).then(()=>{
                res.json({success: true})
            })
        })
})
module.exports = router;