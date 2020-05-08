const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, BOOLEAN, INTEGER, FLOAT} = Sequelize

const Product = db.define('product', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  unit: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageURL: {
    type: STRING,
    allowNull: false,
    defaultValue: 'https://picsum.photos/250'
  },
  inventoryQTY: {
    type: INTEGER
  },
  bestSeller: {
    type: BOOLEAN
  }
})

module.exports = Product
