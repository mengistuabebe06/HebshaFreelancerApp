import React, { Component } from 'react'
import { Link  } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import PropsType from 'prop-types'
import {connect} from 'react-redux'
import {classnames} from 'classnames'

import {loginUser} from '../../action/authAction'
import jwtDecoded from 'jwt-decode'
import setAuthToken from '../../utils/setAuthToken'
import {setCurrentUser} from '../../action/authAction'



class Login extends Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    
  }

  componentDidMount(){
    //  const history = useNavigate();
    if(this.props.auth.isAuthenticated){
      this.props.history('/job')
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/job')
    }
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }

  onChange (e){
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e){
    e.preventDefault()
    const UserData ={
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(UserData)
    // console.log(UserData)
  }
  render() {

    const { errors } = this.state


    return (
      <section className="container">
      <div className="alert alert-danger">
        Invalid Credentials
      </div>

      <h1 className="large text-primary">
        Sign In
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into your account</p>
      <form onSubmit={this.onSubmit} className="form">
        <div className="form-group">
          <input 
            type="email" 
            // className={classnames('form-group', {
            //   'is-invalid': errors.email
            // })}
            placeholder="Email Address" 
            name='email' 
            value={this.state.name} 
            onChange={this.onChange}
            />
            {errors.email && (
              <div className='invalid-feedback'>{errors.email}</div>
            )}
        </div>
        <div className="form-group">
          <input 
            type="password"
            // className={classnames('form-group',{
            //   'is-invalid': errors.password
            // })}
             placeholder="Password" 
             minlength="6" 
             name='password' 
             value={this.state.password} 
             onChange={this.onChange}
             />
            {errors.password && (
              <div className='invalid-feedback'>{errors.password}</div>
            )}
        </div>
        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
    )
  }
}

Login.Prototype = {
  loginUser: PropsType.func.isRequired,
  auth: PropsType.object.isRequired,
  errors: PropsType.object.isRequired
}

const mapStateToProps = (state)=>({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {loginUser}) (Login)
