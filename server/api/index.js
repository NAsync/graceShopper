const router = require('express').Router()
module.exports = router

router.use('/brands', require('./routes/brand'))
router.use('/checkout', require('./routes/checkout'))
router.use('/departments', require('./routes/department'))
router.use('/images', require('./routes/image'))
router.use('/orderProducts', require('./routes/orderProduct'))
router.use('/products', require('./routes/product'))
router.use('/reviews', require('./routes/review'))
router.use('/users', require('./routes/user'))
router.use('/userOrders', require('./routes/userOrder'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
