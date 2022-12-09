import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'

 const  InputGroup= ({
    name,
    placeholder,
    value,
    error,
    icon,
    info,
    type,
    onChange,
}) =>{
  return (
    <div className='input-group mb-3'>
        <div className='input-group-prepend'>
            <span className='input-group-text'>
                <i className={icon}/>
            </span>
        </div>
      <input
      className={classnames('form-control form-control-lg',{
        'is-invalid': error
      })}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}

      />
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  )
}
InputGroup.prototypes ={
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
   
}
InputGroup.defaultProps = {
    type: 'text'
}

export default InputGroup