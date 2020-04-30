const User = require('./user')
const Product = require('./product')
const Review = require('./review')
const Department = require('./department')
const Brand = require('./brand')
const {CreditCard, Merchant} = require('./creditCards')

CreditCard.belongsTo(User)
CreditCard.belongsTo(Merchant)

Product.belongsTo(Department)
Department.hasMany(Product)
Product.belongsTo(Brand)
Brand.hasMany(Product)
Review.belongsTo(User)
User.hasMany(Review)
Review.belongsTo(Product)
Product.hasMany(Review)

module.exports = {
  User,
  Product,
  Review,
  Department,
  Brand,
  CreditCard,
  Merchant
}
