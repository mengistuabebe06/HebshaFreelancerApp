const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const users = require('./routes/api/user')
const profile = require('./routes/api/profile')
const post = require('./routes/api/posts')
const job = require('./routes/api/job')
const passport = require('passport')


const app = express()

//body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// DB config
const db = require('./config/key').mongoDB_url

//connect to mongoDB
mongoose
    .connect(db)
    .then(()=>console.log('MongoDB Connected!'))
    .catch(err=>console.log(err))

// passport mideleware
app.use(passport.initialize())
//passport config
require('./config/passport')(passport)

// use Routes
app.use('/api/users',users)
app.use('/api/profile',profile)
app.use('/api/posts',post)
app.use('/api/job',job)

app.listen(8000,()=>console.log("the server is running on port number 8000:"))