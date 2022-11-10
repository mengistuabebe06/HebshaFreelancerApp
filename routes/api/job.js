const express = require('express')
const router = express.Router()

//@routes GET api/jobs/test
router.get('/test',(req,res)=>{
    res.json({mes:"jobs works"})
})

module.exports = router;