const User = require('./user')
const {CreditCard, Merchant} = require('./creditCards')

CreditCard.belongsTo(User)
CreditCard.belongsTo(Merchant)

module.exports = {
  User,
  CreditCard,
  Merchant
}
