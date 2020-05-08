const router = require('express').Router()
const Sequelize = require('sequelize')
const {Image} = require('../db/models')
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

// router.get('/:id', async (req, res, next) => {
//   const id = req.params.id
//   try {
//     const product = await Product.findByPk(id, {
//       include: [
//         {
//           model: Review
//         },
//         {
//           model: Brand,
//           attributes: ['name']
//         }
//       ]
//     })
//     res.status(200).send(product)
//   } catch (err) {
//     next(err)
//   }
// })

// router.post('/', async (req, res, next) => {
//   try {
//     const product = await Product.create(req.body)
//     res.status(201).send(product)
//   } catch (err) {
//     next(err)
//   }
// })

// router.put('/:id', async (req, res, next) => {
//   const id = req.params.id
//   try {
//     const product = await Product.findByPk(id)
//     product.update(req.body)
//     res.status(200).send(product)
//   } catch (err) {
//     next(err)
//   }
// })

// router.delete('/:id', async (req, res, next) => {
//   const id = req.params.id
//   try {
//     const product = await Product.findByPk(id)
//     product.destroy()
//     res.sendStatus(204)
//   } catch (err) {
//     next(err)
//   }
// })
