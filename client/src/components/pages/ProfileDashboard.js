import React from "react";
import {Link } from "react-router-dom";

const ProfileDashboard = () => {
  return (
    <div className="container">
      <Link to="/edit-profile" className="btn btn-lg">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-lg">
        <i className="fab fa-black-tie text-primary"></i> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-lg">
        <i className="fas fa-graduation-cap text-primary"></i> Add Education
      </Link>
    </div>
  );
};

export default ProfileDashboard;
