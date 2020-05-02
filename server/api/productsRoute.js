const router = require('express').Router()
const {Product, Review} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const product = await Product.findAll()
    res.status(200).send(product)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Review
        }
      ]
    })
    res.status(200).send(product)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).send(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const product = await Product.findByPk(id)
    product.update(req.body)
    res.status(200).send(product)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const product = await Product.findByPk(id)
    product.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
