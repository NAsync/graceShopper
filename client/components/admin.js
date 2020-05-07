import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Admin = ({location}) => {
  const {pathname} = location
  return (
    <div>
      <p>
        <Link to={`${pathname}/products`}>Products Admin</Link>
      </p>
      <p>
        <Link to="#">Departments Admin</Link>
      </p>
      <p>
        <Link to="#">Brand Admin</Link>
      </p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Admin)
