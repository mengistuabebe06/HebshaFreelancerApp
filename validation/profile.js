const validator = require('validator')
const isEmpty = require('./is-empty')


module.exports = function validateProfileInput(data){
    let errors = {}

    data.handle = !isEmpty(data.handle) ? data.handle : ''
    data.status = !isEmpty(data.status) ? data.status : ''
    data.skills = !isEmpty(data.skills) ? data.skills : ''

    if(!validator.isLength(data.handle, {min: 2, max: 40})){
        errors.handle = 'Handle needs to between 2 and 40 charactes'
    }
    if(validator.isEmpty(data.handle)){
        errors.handle = 'Profile handle is required'
    }
    if(validator.isEmpty(data.status)){
        errors.status = 'Status filed is required'
    }
    if(validator.isEmpty(data.skills)){
        errors.skills = 'Skill filed is required'
    }

    if(!isEmpty(data.website)){
        if(!validator.isURL(data.website)){
            errors.website = 'NOT a Valid URL'
        }
    }
    if(!isEmpty(data.youtube)){
        if(!validator.isURL(data.youtube)){
            errors.youtube = 'NOT a Valid URL'
        }
    }
    if(!isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter)){
            errors.twitter = 'NOT a Valid URL'
        }
    }
    if(!isEmpty(data.facebook)){
        if(!validator.isURL(data.facebook)){
            errors.facebook = 'NOT a Valid URL'
        }
    }
    if(!isEmpty(data.linkedin)){
        if(!validator.isURL(data.linkedin)){
            errors.linkedin = 'NOT a Valid URL'
        }
    }
    if(!isEmpty(data.instagram)){
        if(!validator.isURL(data.instagram)){
            errors.instagram = 'NOT a Valid URL'
        }
    }
    return{
        errors,
        isValid: isEmpty(errors)
    }
}