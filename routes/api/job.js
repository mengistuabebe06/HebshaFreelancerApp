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

module.exports = router;