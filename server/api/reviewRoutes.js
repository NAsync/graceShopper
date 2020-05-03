const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const review = await Review.findAll()
    res.status(200).send(review)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    res.status(201).send(review)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const review = await Review.findByPk(id)
    review.update(req.body)
    res.status(200).send(review)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const review = await Review.findByPk(id)
    review.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
