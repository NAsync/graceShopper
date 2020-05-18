import React, {Component} from 'react'
import StripeCheckoutButton from './stripeCheckoutButton'
import {connect} from 'react-redux'
import {checkoutCart} from '../store/cart/actions'
import {Redirect} from 'react-router-dom'

//todo list:
//1.input shipping address and bring it to stripe payment
//2.add tax depends on NY or NJ?
//3.show product items or not?
//4.remove chart items when successfully paid, put request -----ok
//5.response for successfully charge - a successful route/redirect or just a message? ------ok
//6.deduct inventory qty (also show out of stock in products)
//7.response for failed charge - a message, redirect?
//8.whatelse data to bring in stripe payment
//9.consider using 3rd part css for buttons

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      success: false
    }
    this.sumAmount = this.sumAmount.bind(this)
    this.redirectSuccess = this.redirectSuccess.bind(this)
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

  redirectSuccess() {
    this.setState({success: true})
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.success !== prevState.success) {
      this.setState({success: false})
    }
  }

  render() {
    const {sumAmount, redirectSuccess} = this
    const totalAmount = sumAmount(this.props.cart.orderProducts)
    const userId = this.props.cart.userId
    const cartCheckout = this.props.cartCheckout
    const order = {
      totalAmount: totalAmount
    }
    if (this.state.success) {
      return <Redirect push to="/success" />
    }
    return (
      <div className="containerCheckout">
        <div className="totalAmtCheckout">{`Your Order Total $${totalAmount}`}</div>
        <StripeCheckoutButton
          order={order}
          cartCheckout={cartCheckout}
          userId={userId}
          redirectSuccess={redirectSuccess}
        />
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

const mapDispatchToProps = dispatch => {
  return {
    cartCheckout: (userId = false) => {
      dispatch(checkoutCart(userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
