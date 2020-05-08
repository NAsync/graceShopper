const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, BOOLEAN, INTEGER, FLOAT, JSON} = Sequelize

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
  // gallery: {
  //   type: STRING,
  //   get: function() {
  //     return JSON.parse(this.getDataValue('gallery'))
  //   },
  //   set: function(val) {
  //     return this.setDataValue('gallery', JSON.stringify(val))
  //   }
  // },
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
