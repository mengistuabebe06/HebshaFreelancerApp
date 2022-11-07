const express = require('express')
const router = express.Router()

//@routes GET api/profile/test
router.get('/test',(req,res)=>{
    res.json({mes:"profile works"})
})

module.exports = router;