const express = require('express')
const router = express.Router()

//@routes GET api/users/test
router.get('/test',(req,res)=>{
    res.json({mes:"user works"})
})

module.exports = router;