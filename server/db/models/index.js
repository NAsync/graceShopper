const User = require('./user')
const Product = require('./product')
const Review = require('./review')
const Department = require('./department')
const Brand = require('./brand')
const {CreditCard, Merchant} = require('./creditCards')

CreditCard.belongsTo(User)
CreditCard.belongsTo(Merchant)
Product.belongsTo(Department)
Product.belongsTo(Brand)
Review.belongsTo(User)
Review.belongsTo(Product)

module.exports = {
  User,
  Product,
  Review,
  Department,
  Brand,
  CreditCard,
  Merchant
}
