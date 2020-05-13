const Sequelize = require('sequelize')
const db = require('../db')
const {BOOLEAN} = Sequelize

const UserOrder = db.define('userOrder', {
  isCheckedOut: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = UserOrder
