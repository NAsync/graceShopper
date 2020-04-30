const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, BOOLEAN, INTEGER, FLOAT} = Sequelize

const Product = db.define('product', {
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
  },
  departmentId: {
    type: INTEGER,
    allowNull: true
    // validate: {
    //   notEmpty: true
    // }
  },
  brandId: {
    type: INTEGER,
    allowNull: true
    // validate: {
    //   notEmpty: true
    // }
  }
})

module.exports = Product
