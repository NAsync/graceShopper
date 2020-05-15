import React, {Component} from 'react'
import StripeCheckoutButton from './stripeCheckoutButton'
import {connect} from 'react-redux'

class Checkout extends Component {
  constructor() {
    super()
    this.sumAmount = this.sumAmount.bind()
  }

  sumAmount(orderProducts) {
    if (!orderProducts) {
      return 0
    }
    if (Object.keys(orderProducts).length === 1) {
      return orderProducts[0].totalPrice
    } else {
      return orderProducts.reduce((accum, cur) => accum + cur.totalPrice, 0)
    }
  }

  render() {
    const {sumAmount} = this
    console.log(this.props.cart)
    const totalAmount = sumAmount(this.props.cart.orderProducts)
    console.log(totalAmount)
    const order = {
      totalAmount: totalAmount
    }

    return (
      <div>
        <div>{`Your Order $${totalAmount}`}</div>
        <StripeCheckoutButton order={order} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Checkout)
