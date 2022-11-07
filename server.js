const express = require('express')
const mongoose = require('mongoose')

const users = require('./routes/api/user')
const profile = require('./routes/api/profile')
const post = require('./routes/api/posts')

const app = express()
// DB config
const db = require('./config/key').mongoDB_url

//connect to mongoDB
mongoose
    .connect(db)
    .then(()=>console.log('MongoDB Connected!'))
    .catch(err=>console.log(err))

app.get('/',(req,res)=>{
    res.send("hello world!")
})

// use Routes
app.use('/api/users',users)
app.use('/api/profile',profile)
app.use('/api/posts',post)


app.listen(8000,()=>console.log("the server is running on port number 8000:"))