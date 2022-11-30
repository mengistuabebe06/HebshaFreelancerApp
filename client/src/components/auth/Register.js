import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link,withRouter } from 'react-router-dom'

// import axios from  'axios'
import { connect } from 'react-redux'
import { registerUser } from '../../action/authAction'

class Register extends Component {
  //create a componet based state
  constructor(){
    super();
    this.state ={
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history('/job')
    }
  }
  //run then the compnetnt recive any properties
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }

  onChange(e){
    // this.setState({name: 'johon'}) we can set indivsualy like this to make it in mass use belew code
    this.setState({ [e.target.name] : e.target.value })
  }
  onSubmit(e){
    e.preventDefault()
    //this is a input data from the user that going to send to the backend 
    const newUser ={
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history)
    // axios.post('/api/users/register', newUser)
    //   .then(res=> console.log(res.data))
    //   .catch(err=> console.log(err.response.data))
    // console.log(newUser)
  }
  render() {
    const { errors } = this.state;
    // const { user } = this.props.auth

    return (
      <section className="container">
        {/* { user ? user.name : null } */}
      <h1 className="large text-primary">
        Sign Up
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form onSubmit={this.onSubmit} className='form'>
        <div className="form-group">
          <input type="text" placeholder="Name" name='name' value={this.state.name} onChange ={this.onChange} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name='email' value={this.state.email} onChange = {this.onChange}/>
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" minlength="6"  name='password' value={this.state.password} onChange ={this.onChange}/>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Confirm Password" minlength="6"  name='password2' value={this.state.password2} onChange={this.onChange}/>
        </div>
        <input type="submit" value="submit" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
    )
  }
}
Register.Prototype = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})


export default connect(mapStateToProps, { registerUser }) (Register)
