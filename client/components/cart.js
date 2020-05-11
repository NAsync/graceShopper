import React from 'react'
import {connect} from 'react-redux'

const Cart = ({isLoggedIn, user}) => (
  <div>
    {isLoggedIn ? (
      <div>
        {/* The cart will show this after you log in */}
        <p>Cart for {user.email}</p>
      </div>
    ) : (
      <div>
        {/* The cart will show this before you log in */}
        <p>Anonymous cart</p>
        <p>Please log in or sign up to keep your cart.</p>
      </div>
    )}
  </div>
)

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

export default connect(mapStateToProps)(Cart)
