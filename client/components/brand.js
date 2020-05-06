import React, {Component} from 'react'
//import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import ProductCard from './productCard'

const Brand = ({brand}) => {
  return <div>HI</div>
}

const mapStateToProps = ({brand}) => {
  console.log('brand', brand)
  if (!brand) {
    return {}
  }
  return {
    brand
  }
}

export default connect(mapStateToProps)(Brand)
