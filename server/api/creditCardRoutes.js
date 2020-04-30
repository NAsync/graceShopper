const router = require('express').Router()
const {CreditCard} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const creditCard = await CreditCard.findAll()
    res.status(200).send(creditCard)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const creditCard = await CreditCard.create(req.body)
    res.status(201).send(creditCard)
  } catch (err) {
    next(err)
  }
})

router.delete('/:ccNumber', async (req, res, next) => {
  try {
    const creditCard = await CreditCard.findByPk(req.params.ccNumber)
    creditCard.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
