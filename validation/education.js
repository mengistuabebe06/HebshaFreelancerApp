const validator = require('validator')
const isEmpty = require('./is-empty')


module.exports = function validateEducationInput(data){
    let errors = {}

    data.school = !isEmpty(data.school) ? data.school : ' '
    data.degree = !isEmpty(data.degree) ? data.degree : ' '
    data.filedofstudy = !isEmpty(data.filedofstudy) ? data.filedofstudy : ' '
    data.from = !isEmpty(data.from) ? data.from : ' '

    if(validator.isEmpty(data.school)){
        errors.school = 'School title field is required'
    }
    if(validator.isEmpty(data.degree)){
        errors.degree = 'degree field is required'
    }
    if(validator.isEmpty(data.filedofstudy)){
        errors.filedofstudy = 'Filed of study field is required'
    }
    if(validator.isEmpty(data.from)){
        errors.from = 'From field is required'
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}