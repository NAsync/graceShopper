import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({order}) => {
  console.log('strip', order)
  const priceForStripe = order.totalAmount * 100
  const publishableKey = 'pk_test_fuzmrsq8tsZrctgTeJmHxClb00cwD5jxSX'

  console.log('price', priceForStripe)

  const onToken = token => {
    const body = {
      token,
      order
    }
    const headers = {
      'Content-Type': 'application/json'
    }
    //only work when it's hosted as https
    return fetch(`http://localhost:8080/api/checkout/payment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log('RESPONSE', response)
        const {status} = response
        console.log('STATUS', status)
      })
      .catch(error => console.log(error))
  }

  return (
    <StripeCheckout
      label="Pay Now"
      name="JAR Online Shopping"
      billingAddress
      shippingAddress
      description={`Your total is $${order.totalAmount}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    >
      <button className="btn-large pink">Pay Card</button>
    </StripeCheckout>
  )
}

export default StripeCheckoutButton
