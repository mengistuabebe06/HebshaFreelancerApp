import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link,useLocation,useNavigate,useParams} from 'react-router-dom'

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
class Experience extends Component {
  render() {
    const experience = this.props.experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>{exp.from} - {exp.to}</td>
            <td><button className='btn btn-danger'>Delete</button></td>
        </tr>
    ))
    return (
      <div>
        
      </div>
    )
  }
}

export default connect(null, {}) (withRouter(Experience))