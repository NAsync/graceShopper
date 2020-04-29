const db = require('../db')
const {ENUM, STRING, UUID, UUIDV4} = require('sequelize')

const CreditCard = db.define('creditCard', {
  ccNumber: {
    type: STRING,
    unique: true,
    validate: {
      len: [16]
    },
    primaryKey: true
  }
})

const Merchant = db.define('merchant', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: {
    type: ENUM,
    values: ['MasterCard', 'Visa', 'Discover', 'American Express']
  },
  imageUrl: {
    type: STRING
  }
})

module.exports = {
  CreditCard,
  Merchant
}
