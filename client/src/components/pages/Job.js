import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types'
import {connect} from 'react-redux' 
import {getJob} from '../../action/jobAction'
import Spinner from "../shared/Spinner";

class Job extends Component {
  
 componentDidMount(){
  this.props.getJob();
 }
  createListofJobs(){
    
    console.log("createList of jobs")
    console.log(this.props.job)
    return this.props.job.map((job)=>(
      <div key={job.id}>
          <h3>{job.title}</h3>
      </div>
    ))

  
  // obj = Array.from(this.props.job)
  // return Object.keys(this.props.job).map((key) =>{
  //   return (
  //     <li key={key.id}>Key: {key}, Value: {this.props.job[key]}</li>
  //   )
  // })
}

  render() {
    const { job, loading } = this.props.job

    console.log("job data from props")
    console.log(this.props.job.job)
    console.log("job data from accepted object")
    console.log(job)
    let jobboard;

    if(job === null || loading){
      jobboard = <Spinner />
    }else{
      if (Object.keys(job).length > 0){
        jobboard =( this.props.job.job.map((job)=>(
          // <div key={job.id}>
          //     <h3>{job.title}</h3>
          // </div>
          <div className="job-item p-4 mb-4">
          <div className="row g-4">
          <div className="col-sm-12 col-md-8 d-flex align-items-center">
          <ul>
          </ul>
          <img
            className="flex-shrink-0 img-fluid border rounded"
            src="./img/com-logo-1.jpg"
            alt=""
            style={{ width: "80px", height: "80px" }}
          />
          <div className="text-start ps-4">
            <h5 key={job.id} className="mb-3">{job.title}</h5>
            <span className="text-truncate me-3">
              <i key={job.id} className="fa fa-map-marker-alt text-primary me-2"></i>
              {job.level}, Ethiopia
            </span>
            <span className="text-truncate me-3">
              <i key={job.id} className="far fa-clock text-primary me-2"></i> {job.status}
            </span>
            <span className="text-truncate me-0">
              <i key={job.id} className="far fa-money-bill-alt text-primary me-2"></i>
              ${job.price}
            </span>
          </div>
          <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
            <div className="d-flex mb-3">
              <a className="btn btn-light btn-square me-3" href="">
                <i className="far fa-heart text-primary"></i>
              </a>
            
              <Link className="btn btn-primary" to="./JobList" onClick="redirect()">
                   Apply Now
                   {/* pass a job id or some usefull infotmation to pass from this page to details pages  `path/$ {details/job.id}` */}
              </Link>
            </div>
            <small className="text-truncate">
              <i key={job.id} className="far fa-calendar-alt text-primary me-2"></i>
              Date Line: {job.date}
            </small>
          </div>
        </div>
        </div>
        </div>
        )))
      }else{
        jobboard= (
          <div>
            <p className="lead text-muted"> Wellcame {job}</p>
          </div>
        )
      }
    }
    
    return (
    
      <div className="container-xxl py-5">
        <div className="container">
          <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            Job Listing

          </h1>
          <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
            <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active"
                  data-bs-toggle="pill"
                  href="#tab-1"
                >
                  <h6 className="mt-n1 mb-0">Featured</h6>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 pb-3"
                  data-bs-toggle="pill"
                  href="#tab-2"
                >
                  <h6 className="mt-n1 mb-0">Full Time</h6>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 me-0 pb-3"
                  data-bs-toggle="pill"
                  href="#tab-3"
                >
                  <h6 className="mt-n1 mb-0">Part Time</h6>
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">

                    {jobboard}
                    {/* <div className="col-sm-12 col-md-8 d-flex align-items-center">
                      <ul>
                      {jobboard}
                     
                      </ul>
                      <img
                        className="flex-shrink-0 img-fluid border rounded"
                        src="./img/com-logo-1.jpg"
                        alt=""
                        style={{ width: "80px", height: "80px" }}
                      />
                      <div className="text-start ps-4">
                        <h5 className="mb-3">Software Engineer</h5>
                        <span className="text-truncate me-3">
                          <i className="fa fa-map-marker-alt text-primary me-2"></i>
                          New York, USA
                        </span>
                        <span className="text-truncate me-3">
                          <i className="far fa-clock text-primary me-2"></i>Full Time
                        </span>
                        <span className="text-truncate me-0">
                          <i className="far fa-money-bill-alt text-primary me-2"></i>
                          $123 - $456
                        </span>
                      </div>
                      <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                        <div className="d-flex mb-3">
                          <a className="btn btn-light btn-square me-3" href="">
                            <i className="far fa-heart text-primary"></i>
                          </a>
                        
                          <Link className="btn btn-primary" to="./JobList" onClick="redirect()">
                               Apply Now
                          </Link>
                        </div>
                        <small className="text-truncate">
                          <i className="far fa-calendar-alt text-primary me-2"></i>
                          Date Line: 01 Jan, 2045
                        </small>
                      </div>
                    </div> */}

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Job.propTypes  = {
  getJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    job: state.job,
    loading: state.loading,
    errors: state.error
})

export default connect(mapStateToProps, {getJob})(Job);
