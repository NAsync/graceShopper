const router = require('express').Router()
const {Brand, Department, Product, Review, Image} = require('../../db/models')
const Sequelize = require('sequelize')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const department = await Department.findAll()
    res.status(200).send(department)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const department = await Department.findByPk(id, {
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
            },
            {
              model: Image,
              attributes: ['url']
            }
          ]
        }
      ],
      group: [
        'department.id',
        'products.id',
        'products->brand.id',
        'products->images.id'
      ]
    })
    res.status(200).send(department)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const department = await Department.create(req.body)
    res.status(201).send(department)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const department = await Department.findByPk(id)
    department.update(req.body)
    res.status(200).send(department)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const department = await Department.findByPk(id)
    department.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
