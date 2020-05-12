import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100
  const publishablekey = 'pk_test_fuzmrsq8tsZrctgTeJmHxClb00cwD5jxSX'

  const onToken = token => {
    alert('Payment successful')
  }

  return (
    <StripeCheckout
      label="Pay Now"
      name="JAR Online Shopping"
      billingAddress
      shippingAddress
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishablekey}
    />
  )
}

export default StripeCheckoutButton
