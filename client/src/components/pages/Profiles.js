import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux' 
import {Link} from 'react-router-dom'
import {getCurrentProfile, deleteAccount} from '../../action/profileAction'
import Spinner from '../shared/Spinner'
import ProfileDashboard from './ProfileDashboard'
import Experience from './Experience'

 class Profiles extends Component {
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    onDeleteClick(e){
      this.props.deleteAccount()
    }
  render() {
    const {user} = this.props.auth
    const { profile, loading } = this.props.profile
    console.log("Profile data")
    console.log(profile)

    let dashboardcontent  
    if(profile === null || loading ){
      dashboardcontent = <Spinner/>
    }else{
      //check if the user has log and has profile and display the profile
      if(Object.keys(profile).length > 0){
        dashboardcontent = (
          <div>
            <p className='lead text-muted'>
              Wellcame to the user name <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileDashboard />
            {/* TODO: exp and edu */}
            {/* pass the experance from profile data to the Experinace page as props*/}
            <Experience  experience = {profile.experience} />
            <div style={{marginBottom: '60px'}}> </div>
            <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
              Delete My Account
            </button>

          </div>
        )
      }else{
        dashboardcontent = (
          <div>
            <p>{user.name}</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">create profile</Link>
          </div>
        )
      }
    }
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
          <h2>dashboard profile</h2>
            {dashboardcontent}
          </div>
        </div>
      </div>
    )
  }
}
Profiles.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
profile: state.profile,
auth: state.auth
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount}) (Profiles)