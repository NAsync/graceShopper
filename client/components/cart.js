import React, {Component} from 'react'
import {connect} from 'react-redux'
import ProductCardCart from './productCardCart'
import {readCart} from '../store/cart/actions'
import {Link} from 'react-router-dom'

//todo list:
//1.check wrong item total
//2.not logged in situation
//3.add/reduce item qty

class Cart extends Component {
  constructor() {
    super()
    this.sumAmount = this.sumAmount.bind()
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.loadCart(this.props.user.id)
    } else {
      this.props.loadCart()
    }
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
    const {isLoggedIn, user, cart} = this.props
    const {sumAmount} = this
    const totalAmount = sumAmount(this.props.cart.orderProducts)
    return (
      <div>
        {isLoggedIn ? (
          <div className="containerCart">
            {/* The cart will show this after you log in */}
            <p className="userEmailCart">Cart for {user.email}</p>
            <ul>
              {cart.orderProducts &&
                cart.orderProducts.map(orderProduct => (
                  <li key={orderProduct.id}>
                    <ProductCardCart orderProduct={orderProduct} />
                  </li>
                ))}
            </ul>
            <div className="checkoutDivCart">
              <span className="totalAmtCart">{`Cart Total $${totalAmount}`}</span>
              <Link to="/checkout" className="checkoutLink">
                <button className="checkoutBtnCart">Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* The cart will show this before you log in */}
            <p>Anonymous cart</p>
            <p>Please log in or sign up to keep your cart.</p>
            <ul>
              {cart.orderProducts &&
                cart.orderProducts.map(orderProduct => (
                  <li key={orderProduct.id}>
                    <ProductCardCart orderProduct={orderProduct} />
                  </li>
                ))}
            </ul>
          </div>
        )}
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
    loadCart: (userId = false) => {
      dispatch(readCart(userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
