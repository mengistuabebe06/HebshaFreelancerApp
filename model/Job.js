const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create a schema 
// job and bid table put here 
const JobSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
    },
    price:{
        type: String,
    },
    status:{
        type:[String]
    },
    level:{
        type: [String]
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    bid: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            startprice:{
                type: String,
                require: true
            },
            coverletter: {
                type: String,
                require: true
            },
            status:{
                type: String,
                require: true
            },
            deadline: {
                type: Date,
            },
            submitdate: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

module.exports = Job = mongoose.model('job', JobSchema)
