const Sequelize = require('sequelize')
const db = require('../db')
const {INTEGER} = Sequelize

const OrderProduct = db.define('orderProduct', {
  quantity: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 1
  }
})

module.exports = OrderProduct
