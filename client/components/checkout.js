import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import StripeCheckoutButton from './stripeCheckoutButton'

class Checkout extends Component {
  constructor() {
    super()
  }

  render() {
    const total = 100
    return <StripeCheckoutButton price={total} />
  }
}

export default Checkout
