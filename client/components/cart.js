import React, {Component} from 'react'
import {connect} from 'react-redux'
import ProductCardCart from './productCardCart'
import {readCart} from '../store/cart/actions'
import {Link} from 'react-router-dom'

class Cart extends Component {
  componentDidMount() {
    if (this.props.user.id) {
      this.props.loadCart(this.props.user.id)
    } else {
      this.props.loadCart()
    }
  }

  render() {
    const {isLoggedIn, user, cart} = this.props
    return (
      <div>
        {isLoggedIn ? (
          <div>
            {/* The cart will show this after you log in */}
            <p>Cart for {user.email}</p>
            <ul>
              {cart.orderProducts &&
                cart.orderProducts.map(orderProduct => (
                  <li key={orderProduct.id}>
                    <ProductCardCart orderProduct={orderProduct} />
                  </li>
                ))}
            </ul>
            <Link to="/checkout">
              <button>Checkout</button>
            </Link>
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
