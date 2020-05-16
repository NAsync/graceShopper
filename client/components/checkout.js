import React, {Component} from 'react'
import StripeCheckoutButton from './stripeCheckoutButton'
import {connect} from 'react-redux'

//todo list:
//1.input shipping address and bring it to stripe payment
//2.add tax depends on NY or NJ?
//3.show product items or not?
//4.remove chart items when successfully paid, put request
//5.response for successfully charge - a successful route/redirect or just a message?
//6.deduct inventory qty (also show out of stock in products)
//7.response for failed charge - a message, redirect?
//8.whatelse data to bring in stripe payment

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
    const totalAmount = sumAmount(this.props.cart.orderProducts)
    const order = {
      totalAmount: totalAmount
    }

    return (
      <div className="containerCheckout">
        <div className="totalAmtCheckout">{`Your Order Total $${totalAmount}`}</div>
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
