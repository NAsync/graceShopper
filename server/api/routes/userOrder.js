const router = require('express').Router()
const {
  UserOrder,
  Product,
  OrderProduct,
  Brand,
  Review,
  Image
} = require('../../db/models')
const Sequelize = require('sequelize')
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

router.get('/cart/:userId', async (req, res, next) => {
  const userId = req.params.userId
  try {
    const userOrder = await UserOrder.findAll({
      where: {userId, isCheckedOut: false},
      include: [
        {
          model: OrderProduct,
          attributes: {
            include: [
              [Sequelize.literal('SUM(price * quantity)'), 'totalPrice']
            ]
          },

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
                  model: Brand,
                  attributes: ['name']
                },
                {
                  model: Review,
                  attributes: []
                },
                {
                  model: Image,
                  attributes: ['url']
                }
              ]
            }
          ]
        }
      ],
      group: [
        'userOrder.id',
        'orderProducts.id',
        'orderProducts->product.id',
        'orderProducts->product->brand.id',
        'orderProducts->product->images.id'
      ]
    })
    res.status(200).send(userOrder)
  } catch (err) {
    next(err)
  }
})

router.get('/ordered/:userId', async (req, res, next) => {
  const userId = req.params.userId
  try {
    const userOrder = await UserOrder.findAll({
      where: {userId, isCheckedOut: true},
      include: [
        {
          model: OrderProduct,
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
                  model: Brand,
                  attributes: ['name']
                },
                {
                  model: Review,
                  attributes: []
                },
                {
                  model: Image,
                  attributes: ['url']
                }
              ]
            }
          ]
        }
      ],
      group: [
        'userOrder.id',
        'orderProducts.id',
        'orderProducts->product.id',
        'orderProducts->product->brand.id',
        'orderProducts->product->images.id'
      ]
    })
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
    await userOrder.update(req.body)
    res.status(200).send(userOrder)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const userOrder = await UserOrder.findByPk(id)
    await userOrder.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
