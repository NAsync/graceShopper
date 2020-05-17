import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {readProduct} from '../store/products/actions'
import ReviewStars from './reviewStars'
//toDo list:
//1. bring users to get user name on review
//2. add to card function
//3. hover or click small images and show in the big image container

class Search extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <form onSubmit={ev => ev.preventDefault()}>
        <input type="text" />
        <button>search</button>
      </form>
    )
  }
}

const mapStateToProps = ({products}) => ({
  products
})

export default connect(mapStateToProps)(Search)
