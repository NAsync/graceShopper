import React from 'react'
import {connect} from 'react-redux'

const Cart = ({isLoggedIn, user}) => {
  console.log(user)
  return (
    <div>
      {isLoggedIn ? (
        <div>
          {/* The cart will show this after you log in */}
          <p>Cart for {user.email}</p>
          <ul>
            {
              <li>
                {
                  user.userOrders.find(order => !order.isCheckedOut)
                    .orderProducts[0].name
                }
              </li>
            }
          </ul>
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
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

export default connect(mapStateToProps)(Cart)
