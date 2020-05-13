const router = require('express').Router()
const {
  Review,
  User,
  UserOrder,
  OrderProduct,
  Product,
  Brand
} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.status(200).send(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const users = await User.findByPk(id, {
      include: [
        {
          model: Review
        },
        {
          model: UserOrder,
          include: [
            {
              model: OrderProduct,
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
            }
          ]
        }
      ],
      attributes: ['id', 'email']
    })
    res.status(200).send(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).send(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const user = await User.findByPk(id)
    await user.update(req.body)
    res.status(200).send(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const user = await User.findByPk(id)
    await user.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
