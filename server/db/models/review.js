const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, INTEGER} = Sequelize

const Review = db.define('review', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rating: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: STRING
  },
  userId: {
    type: INTEGER,
    allowNull: true
    // validate: {
    //   notEmpty: true
    // }
  },
  productId: {
    type: INTEGER,
    allowNull: true
    // validate: {
    //   notEmpty: true
    // }
  }
})

module.exports = Review
