import React, { Component } from 'react'
import { Link,useLocation,useNavigate,useParams} from 'react-router-dom'
import  TextFieldGroup  from '../shared/TextFieldGroup'
import  TextAreaFiledFroup  from '../shared/TextAreaFieldGroup'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {addEducation} from '../../action/profileAction'

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let filedofstudy = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ filedofstudy, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}
class AddEducation extends Component {
    constructor(props){
        super(props)
        this.state = {
            school: '',
            degree: '',
            filedofstudy: '',
            from: '',
            to: '',
            current: false,
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
        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            filedofstudy: this.state.filedofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description:this.state.description
        }
        console.log('submit')
        console.log(eduData);
        this.props.addEducation(eduData, this.props.history)
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
                    <h1 className='display-4  text-center'>Add Education</h1>
                    <p className='lead text-center'> 
                        Add any job or postion that you had in the past or current
                    </p>
                    <small className='d-block pd-3'>* = required filed</small>
                    <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        placeholder='* school'
                        name = 'school'
                        value = {this.state.school}
                        onChange={this.onChange}
                        error = {errors.school}
                    />
                    <TextFieldGroup
                        placeholder='* Job degree'
                        name = 'degree'
                        value = {this.state.degree}
                        onChange={this.onChange}
                        error = {errors.degree}
                    />
                    <TextFieldGroup
                        placeholder='* filedofstudy'
                        name = 'filedofstudy'
                        value = {this.state.filedofstudy}
                        onChange={this.onChange}
                        error = {errors.filedofstudy}
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

AddEducation.prototypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
})

export default connect(mapStateToProps, {addEducation}) (withRouter(AddEducation))
