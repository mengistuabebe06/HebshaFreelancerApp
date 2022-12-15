import React, { Component } from 'react'
import { Link,useLocation,useNavigate,useParams} from 'react-router-dom'
import  TextFieldGroup  from '../shared/TextFieldGroup'
import  TextAreaFiledFroup  from '../shared/TextAreaFieldGroup'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {addExperinace} from '../../action/profileAction'

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}
class AddExperinace extends Component {
    constructor(props){
        super(props)
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: '',
            description: '',
            errors: {},
            disabled: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onCheck = this.onCheck.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.error){
            this.setState({errors: nextProps.error})
        }
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e){
        e.preventDefault()
        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description:this.state.description
        }
        console.log('submit')
        console.log(expData);
        this.props.addExperinace(expData, this.props.history)
    }
    onCheck(e){
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }


  render() {
    //bring the errors here
    const { errors } = this.state
    return (
      <div className='add-experinace'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 m-auto'>
                    <Link to= '/profiles' className='btn btn-light'>
                        Go Back
                    </Link>
                    <h1 className='display-4  text-center'>Add Experinace</h1>
                    <p className='lead text-center'> 
                        Add any job or postion that you had in the past or current
                    </p>
                    <small className='d-block pd-3'>* = required filed</small>
                    <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        placeholder='* Company'
                        name = 'company'
                        value = {this.state.company}
                        onChange={this.onChange}
                        error = {errors.company}
                    />
                    <TextFieldGroup
                        placeholder='* Job title'
                        name = 'title'
                        value = {this.state.title}
                        onChange={this.onChange}
                        error = {errors.title}
                    />
                    <TextFieldGroup
                        placeholder='* Location'
                        name = 'location'
                        value = {this.state.location}
                        onChange={this.onChange}
                        error = {errors.location}
                    />
                    <h6>From Date</h6>
                    <TextFieldGroup
                        name="from"
                        type="date"
                        value={this.state.from}
                        onChange={this.onChange}
                        error={errors.from}
                    />
                    <h6>To Date</h6>
                    <TextFieldGroup
                        name="to"
                        type="date"
                        value={this.state.to}
                        onChange={this.onChange}
                        error={errors.to}
                        disabled={this.state.disabled ? 'disabled' : ''}
                    />
                    <div className='form-check mb-4'>
                        <input
                        type="checkbox"
                        className='form-check-input'
                        name='current'
                        value={this.state.current}
                        checked={this.state.current}
                        onChange={this.onCheck}
                        id="current"
                        />
                        <label htmlFor='current' className='form-check-label' >
                            Current Job
                        </label>
                    </div>
                    <TextAreaFiledFroup
                        placeholder="Job Description"
                        name='description'
                        value={this.state.description}
                        onChange={this.onChange}
                        error={errors.description}
                        info="Tell us about the postion"
                    />
                    <input 
                        type="submit" 
                        value="Submit"
                        className='btn btn-info btn-block mt-4'
                    />
                    </form>
                </div>

            </div>
        </div>
      </div>
    )
  }
}

AddExperinace.prototypes = {
    addExperinace: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
})

export default connect(mapStateToProps, {addExperinace}) (withRouter(AddExperinace))
