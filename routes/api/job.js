const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

//load profile model
const Job = require('../../model/Job')

//@routes GET api/jobs/test
router.get('/test',(req,res)=>{
    res.json({mes:"jobs works"})
})

//@routes GET api/jobs/
//@desc GET a jobs 
//@access public
router.get('/',(req,res)=>{
    Job.find()
     .sort({date: -1})
     .then(job => res.json(job))
     .catch(err => res.status(404).json({noJobfoud: "No Job found "}))
 })
//@routes post api/jobform
//@desc POST a jobs 
//@access Private
router.post('/jobform',(req,res)=>{
    // const  {errors, isValid} = validateJobInput(req.body)
    // //check the validation
    // if(!isValid){
    //    //if any errors , send 400 with the error object
    //    return res.status(400).json(errors) 
    // }
    const newJob = new Job({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        level: req.body.level,
        price: req.body.price
    });

    newJob.save().then(job => res.json(job))
 })
module.exports = router;