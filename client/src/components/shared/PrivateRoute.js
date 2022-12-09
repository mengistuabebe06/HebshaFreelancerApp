import React from 'react'
import { Route, Redirect,Navigate,Outlet } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


 const PrivateRoute= ({ path, auth, ...rest }) =>(
    <Route
        {...rest}
        render = {props => 
            auth.isAuthenticated === true ? (
                <Route {...props} path={path} />
            ) : (
                <Navigate to="/login" state={{ from: path }} replace />
            )
        }
    />
 )

 PrivateRoute.prototypes ={
    auth: PropTypes.object.isRequired
 } 
 const mapStateToProps = (state) =>({
    auth: state.auth
 })
 
 export default connect(mapStateToProps) (PrivateRoute)