const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, BLOB, VIRTUAL} = Sequelize

const Image = db.define('image', {
  name: {
    type: STRING,
    allowNull: false
  },
  picture: {
    type: BLOB,
    allowNull: true
  }
})

module.exports = Image
