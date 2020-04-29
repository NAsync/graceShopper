const Sequelize = require('sequelize')
const db = require('../db')

const CreditCard = db.define('creditCard', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  ccNumber: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      len: [16]
    }
  }
})

const Merchant = db.define('merchants', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.ENUM,
    values: ['MasterCard', 'Visa', 'Discover', 'American Express']
  },
  imageUrl: {
    type: Sequelize.STRING
  }
})

module.exports = {
  CreditCard,
  Merchant
}
