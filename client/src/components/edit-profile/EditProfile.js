import { connect } from 'react-redux'
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import TextFieldGroup from '../shared/TextFieldGroup'
import TextAreaFiledFroup from '../shared/TextAreaFieldGroup'
import SelectListGroup from '../shared/SelectListGroup'
import InputGroup from '../shared/InputGroup'
import { createProfile, getCurrentProfile} from '../../action/profileAction'
import {useLocation,useNavigate,useParams} from 'react-router-dom'

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
class CreateProfile extends Component {
constructor(props){
    super(props)
    this.state = {
        displaySocialInputs: false,
        handle: '',
        comany: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
}

    componentDidMount(){
        this.props.getCurrentProfile()
    }

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
        const newProfile = {
            comany: this.state.comany,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
        }
        //sent to the acction
        this.props.createProfile(newProfile, this.props.history)
        // console.log("create profile")
        // console.log(newProfile)
    }


  render() {
    const {errors, displaySocialInputs} = this.state
    
    //social inputs
    let socailInputs
    if(displaySocialInputs){
        socailInputs =(
            <div>
                <InputGroup 
                    placeholder="Twitter Profile URL"
                    name = 'twitter'
                    icon = 'fab fa-twitter'
                    value={this.state.twitter}
                    onChange = {this.onChange}
                    error = {errors.twitter}
                />
                <InputGroup 
                    placeholder="facebook Profile URL"
                    name = 'facebook'
                    icon = 'fab fa-twitter'
                    value={this.state.facebook}
                    onChange = {this.onChange}
                    error = {errors.facebook}
                />
                <InputGroup 
                    placeholder="Linkedin Profile URL"
                    name = 'linkedin'
                    icon = 'fab fa-linkedin'
                    value={this.state.linkedin}
                    onChange = {this.onChange}
                    error = {errors.linkedin}
                />
                <InputGroup 
                    placeholder="youtube Profile URL"
                    name = 'youtube'
                    icon = 'fab fa-twitter'
                    value={this.state.youtube}
                    onChange = {this.onChange}
                    error = {errors.youtube}
                />
                <InputGroup 
                    placeholder="instagram Profile URL"
                    name = 'instagram'
                    icon = 'fab fa-instagram'
                    value={this.state.instagram}
                    onChange = {this.onChange}
                    error = {errors.instagram}
                />
            </div>
        )
    }
    //select the options for status 
    const options = [
        {label: "* Select Professional Status",  value: 0},
        {label: " Developer",  value: 'Developer'},
        {label: "Junior Developer",  value: 'unior Developer'},
        {label: "Senior Developer",  value: 'Senior Developer'},
        {label: "Manager",  value: 'Manager'},
        {label: "Studnet or Learning",  value: 'Studnet or Learning'},
        {label: "Instractor or Teacher",  value: 'Instractor or Teacher'},
        {label: "Intern",  value: 'Intern'},
        {label: "Other",  value: 'Other'},

    ]
    return (
        <section class="container">
        <h1 class="large text-primary">
          Create Your Profile
        </h1>
        <p class="lead">
          <i class="fas fa-user"></i> Let's get some information to make your
          profile stand out </p>
        <small>* = required fields</small>
        <form class="form" onSubmit={this.onSubmit}>
            <TextFieldGroup
                placeholder='* profile Handle'
                name = "handle"
                value={this.state.handle}
                onChange={this.onChange}
                error = {errors.handle}
                info = "A unique handle for your profile URL. your name , company name, and nickname"
            />    
            <SelectListGroup
                placeholder='* Status'
                name = "status"
                value={this.state.status}
                onChange={this.onChange}
                error = {errors.status}
                options = {options}
                info = "Give Us an idea of where work"
            /> 
            <TextFieldGroup
                placeholder='* comany'
                name = "comany"
                value={this.state.comany}
                onChange={this.onChange}
                error = {errors.comany}
                info = "GIve you company"
            />  
            <TextFieldGroup
                placeholder='website'
                name = "website"
                value={this.state.website}
                onChange={this.onChange}
                error = {errors.website}
                info = "Give us your website"
            /> 
            <TextFieldGroup
                placeholder='location'
                name = "location"
                value={this.state.location}
                onChange={this.onChange}
                error = {errors.location}
                info = "Give us your location"
            /> 
            <TextFieldGroup
                placeholder='Skill'
                name = "skills"
                value={this.state.skills}
                onChange={this.onChange}
                error = {errors.skills}
                info = "Give us your skills"
            />  
            <TextFieldGroup
                placeholder='githubusername'
                name = "githubusername"
                value={this.state.githubusername}
                onChange={this.onChange}
                error = {errors.githubusername}
                info = "Give us your githubusername"
            />  
            <TextAreaFiledFroup
                placeholder='Short Bio'
                name = "bio"
                value={this.state.bio}
                onChange={this.onChange}
                error = {errors.bio}
                info = "Tell us about yourself"
            /> 
            <div className='mb-3'>
                <button
                    onClick={()=>{
                        this.setState(prevstate=>({
                            displaySocialInputs: !prevstate.displaySocialInputs
                        }))
                    }}
                    className="btn btn-light"
                >
                    Add Social Network Link
                </button>
                <span className='text-muted'>Optional</span>
                {socailInputs}
                <input type='submit' value="Submit" className='btn btn-info' />
            </div>
        </form>
        </section>
    )
  }
}
CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps =(state) =>({
    profile: state.profile,
    errors:  state.errors
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile }) (withRouter(CreateProfile))