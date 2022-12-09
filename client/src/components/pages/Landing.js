import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropsTypes from 'prop-types'
import {connect} from 'react-redux'

class Landing extends Component {

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history('/job')
    }
  }

  render() {
    return (
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Habesha Freelancer</h1>
            <p className="lead">
              Create developer profile/portfolio, share posts and get help from
              other developers
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
              <Link to="/login" className="btn btn">Login</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
Landing.Prototypes = {
  auth: PropsTypes.object.isRequired
}
const mapStateToProps = (state) =>({
  auth: state.auth
})
export default connect(mapStateToProps )(Landing)