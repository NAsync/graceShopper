const Brand = require('./brand')
const {CreditCard, Merchant} = require('./creditCards')
const Department = require('./department')
const Product = require('./product')
const Review = require('./review')
const User = require('./user')
const Image = require('./product-images')

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
Product.hasMany(Image)
Image.belongsTo(Product)

module.exports = {
  User,
  Product,
  Review,
  Department,
  Brand,
  CreditCard,
  Merchant,
  Image
}
