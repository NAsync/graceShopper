const router = require('express').Router()
const stripe = require('stripe')(process.env.SECRECT_KEY)
const uuid = require('uuid/v4')

module.exports = router

router.get('/', (req, res) => {
  res.send('it works!')
})

router.post('/checkout/payment', (req, res) => {
  const {order, token} = req.body
  const idempontencyKey = uuid()

  return (
    stripe.customers
      .create({
        email: token.email,
        source: token.id
      })
      .then(customer => {
        stripe.charges.create(
          {
            amount: order.totalAmount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase from JAR Online Shopping`,
            shipping: {
              name: token.card.name,
              address: {
                country: token.card.address_country
              }
            }
          },
          {idempontencyKey}
        )
      })
      .then(result => res.status(200).json(result))
      //.then(result => console.log(result))
      .catch(err => console.log(err))
  )
})
