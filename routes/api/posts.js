const express = require('express')
const router = express.Router()

//@routes GET api/post/test
router.get('/test',(req,res)=>{
    res.json({mes:"post works"})
})

module.exports = router;