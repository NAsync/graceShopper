const router = require('express').Router()
const {Brand, Department, Product, Review} = require('../db/models')
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
          include: [
            {
              model: Review
            },
            {
              model: Brand,
              attributes: ['name']
            }
          ]
        }
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
