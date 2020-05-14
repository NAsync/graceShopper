import React, {Component} from 'react'
import StripeCheckoutButton from './stripeCheckoutButton'

class Checkout extends Component {
  constructor() {
    super()
  }

  render() {
    const order = {
      totalAmount: 150
    }

    return <StripeCheckoutButton order={order} />
  }
}

export default Checkout
