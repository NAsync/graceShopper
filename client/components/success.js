import React from 'react'
import {Link} from 'react-router-dom'

const Success = () => {
  return (
    <div className="successBox">
      <h3 className="paymentSuccess">Your Payment Was Successful</h3>
      <h1 className="thankyou">Thank You</h1>
      <h5 className="shoppingWithUs">For Shopping With Us!</h5>
      <Link to="/products" className="linkSuccess">
        <button className="backToShopBtnSuccess">Back to Shop</button>
      </Link>
    </div>
  )
}

export default Success
