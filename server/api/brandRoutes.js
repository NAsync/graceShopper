const router = require('express').Router()
const {Brand, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const brand = await Brand.findAll()
    res.status(200).send(brand)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const brand = await Brand.findByPk(id, {
      include: [
        {
          model: Product
        }
      ]
    })
    res.status(200).send(brand)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const brand = await Brand.create(req.body)
    res.status(201).send(brand)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const brand = await Brand.findByPk(id)
    brand.update(req.body)
    res.status(200).send(brand)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const brand = await Brand.findByPk(id)
    brand.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
