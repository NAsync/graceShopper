const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, INTEGER} = Sequelize

const Brand = db.define('brand', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Brand
