const router = require('express').Router()
module.exports = router

router.use('/creditCards', require('./creditCardRoutes'))
router.use('/merchants', require('./merchantRoutes'))
router.use('/users', require('./users'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
