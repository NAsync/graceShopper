const router = require('express').Router()
const {Merchant} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const merchant = await Merchant.findAll()
    res.status(200).send(merchant)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const merchant = await Merchant.create(req.body)
    res.status(201).send(merchant)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const merchant = await Merchant.findByPk(id)
    merchant.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
