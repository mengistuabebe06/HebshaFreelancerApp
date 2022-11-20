const validator = require('validator')
const isEmpty = require('./is-empty')


module.exports = function validatePostInput(data){
    let errors = {}

    data.text = isEmpty(data.text) ? "" : data.text 


    if(!validator.isLength(data.handle, {min: 10, max: 300})){
        errors.handle = 'Post must be  between 10 and 300 charactes'
    }
    if(validator.isEmpty(data.text)){
        errors.text = 'post text filed is required'
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}