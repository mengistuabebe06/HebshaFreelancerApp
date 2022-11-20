const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create a Profile schema
const ProfileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref: 'users'// this like foregne key
    },
    handle:{
        type: String,
        require: true,
        max: 40
    },
    compnay: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status:{
        type: String,
        require: true
    },
    skills:{
        type: [String] // used to store a list of array data in the mongoDB table like php, nodejs, sql, etc
    },
    bio: {
        type: String
    },
    githubusername:{
        type: String
    },
    experience:[
        {
            title:{
                type:String,
                required:true
            },
            company:{
                type:String,
                requiredt:true
            },
            location:{
                type:String
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date,
                default: Date.now
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String
            }
        }
    ],
    education:[
        {
            school:{
                type:String,
                require: true
            },
            degree: {
                type:String,
                require: true
            },
            filedofstudy: {
                type: String,
                require: true
            },
            from:{
                type: Date,
                require: true
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String,
                require: true
            },

        }
    ],
    social: {
        youtube: {
            type: String,
        },
        twiter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        instagram: {
            type: String,
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = Profile = mongoose.model('profile', ProfileSchema)