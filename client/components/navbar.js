import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Search from '../components/search'

const Navbar = ({handleClick, isAdmin, isLoggedIn, cart}) => {
  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home" id="JAR">
              JAR
            </Link>
            <Search />
            <a href="#" id="Log" onClick={handleClick}>
              Logout
            </a>
            <Link to="/cart" id="cart">
              <img
                src="http://getdrawings.com/free-icon/checkout-icon-56.png"
                id="cartImg"
              />
              <div id="cartnum">
                {cart.orderProducts &&
                  cart.orderProducts.reduce(
                    (accum, orderProduct) => accum + orderProduct.quantity,
                    0
                  )}
              </div>
            </Link>
            {isAdmin ? <Link to="/admin">Admin</Link> : ''}
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/home">JAR</Link>
            <Search />
            <Link to="/login" id="Log">
              Login
            </Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart" id="cart">
              <img
                src="http://getdrawings.com/free-icon/checkout-icon-56.png"
                id="cartImg"
              />
              <div id="cartnum">
                {cart.orderProducts &&
                  cart.orderProducts.reduce(
                    (accum, orderProduct) => accum + orderProduct.quantity,
                    0
                  )}
              </div>
            </Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isAdmin: !!state.user.isAdmin,
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
