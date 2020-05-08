const {Brand, Product, Review} = require('../db/models')
const router = require('express').Router()
const Sequelize = require('sequelize')

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
  const id = req.params.id
  try {
    const brand = await Brand.findByPk(id, {
      include: [
        {
          model: Product,
          attributes: {
            include: [
              [Sequelize.fn('AVG', Sequelize.col('rating')), 'reviewAvg']
            ]
          },
          include: [
            {
              model: Review,
              attributes: []
            },
            {
              model: Brand,
              attributes: ['name']
            }
          ]
        }
      ],
      group: ['brand.id', 'products.id', 'products->brand.id']
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
  const id = req.params.id
  try {
    const brand = await Brand.findByPk(id)
    brand.update(req.body)
    res.status(200).send(brand)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const brand = await Brand.findByPk(id)
    brand.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
