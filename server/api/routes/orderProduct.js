const router = require('express').Router()
const {OrderProduct} = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orderProduct = await OrderProduct.findAll()
    res.status(200).send(orderProduct)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const orderProduct = await OrderProduct.findByPk(id)
    res.status(200).send(orderProduct)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const orderProduct = await OrderProduct.create(req.body)
    res.status(201).send(orderProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const orderProduct = await OrderProduct.findByPk(id)
    await orderProduct.update(req.body)
    res.status(200).send(orderProduct)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const orderProduct = await OrderProduct.findByPk(id)
    await orderProduct.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
