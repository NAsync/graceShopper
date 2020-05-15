const router = require('express').Router()
const stripe = require('stripe')(process.env.SECRECT_KEY)

module.exports = router

router.get('/payment', (req, res) => {
  res.send('it works!')
})

router.post('/payment', (req, res) => {
  const {order, token} = req.body

  return stripe.customers
    .create({
      email: token.email,
      source: token.id
    })
    .then(customer => {
      stripe.charges.create({
        amount: order.totalAmount * 100,
        currency: 'usd',
        customer: customer.id,
        description: `purchase from JAR Online Shopping`
        // left shipping here in case we want to add that in later
        // shipping: {
        //   name: token.card.name,
        //   address: {
        //     country: token.card.address_country
        //   }
        // }
      })
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})
