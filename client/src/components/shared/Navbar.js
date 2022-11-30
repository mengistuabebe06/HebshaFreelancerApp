import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logoutUser} from '../../action/authAction'

class Navbar extends Component {

  onlogoutClick(e){
    e.preventDefault();
    this.props.logoutUser()
  }

  render() {

    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <ul>
      <li><Link to="/profiles">Home</Link></li>
      <li><Link to="/job">Jobs</Link></li>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/profiles">About</Link></li>
      <li><Link to="/profiles">Contact</Link></li>
      <a 
        href='#' 
        onClick={this.onlogoutClick.bind(this)}
        className='nav-link'> 
        <img 
        className='rounded-circle'
          src={user.avatar}
          alt={user.name}
          style={{width:'25px', marginRight: '5px'}}
          title= 'you must have a gravatar coneected to your email'
        />{ ' '}
          Logout
        </a>
  
    </ul>
    );
    const guestLinks = (
      <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/job">Jobs</Link></li>
      <li><Link to="/profiles">profile</Link></li>
      <li><Link to="/About">About</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
    );

    return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/">  Habesha Freelance </Link>
        </h1>
        {isAuthenticated ? authLinks  : guestLinks}
      </nav>

    )
  }
}
Navbar.Prototype = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
  auth: state.auth,

})
export default connect(mapStateToProps,{logoutUser})(Navbar);