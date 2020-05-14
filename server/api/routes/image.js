const router = require('express').Router()
const Sequelize = require('sequelize')
const {Image} = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const image = await Image.findAll()
    res.send(image)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const image = await Image.findByPk(id)
    const bufferedImg = Buffer.from(image.dataValues.picture)

    res.contentType('image/jpeg')
    res.end(bufferedImg)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const image = await Image.create(req.body) //use fs.readFileSync on front end for picture
    res.status(201).send(image)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const image = await Image.findByPk(id)
    image.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
