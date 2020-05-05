import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {readProducts} from '../store/products/actions'

const Admin = ({load, location}) => {
  const {pathname} = location
  console.log(location)
  load()
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

const mapDispatchToProps = dispatch => {
  return {
    load: () => {
      dispatch(readProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
