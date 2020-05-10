const router = require('express').Router()
const {UserOrder, Product, OrderProduct} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const userOrder = await UserOrder.findAll({
      include: [
        {
          model: OrderProduct
        }
      ]
    })
    res.status(200).send(userOrder)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const userOrder = await UserOrder.findByPk(id)
    res.status(200).send(userOrder)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const userOrder = await UserOrder.create(req.body)
    res.status(201).send(userOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const userOrder = await UserOrder.findByPk(id)
    userOrder.update(req.body)
    res.status(200).send(userOrder)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const userOrder = await UserOrder.findByPk(id)
    userOrder.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
