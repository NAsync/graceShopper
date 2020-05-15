const Brand = require('./brand')
const Department = require('./department')
const Product = require('./product')
const Review = require('./review')
const User = require('./user')
const UserOrder = require('./userOrder')
const OrderProduct = require('./ordersProducts')
const Image = require('./image')

Product.belongsTo(Department)
Department.hasMany(Product)
Product.belongsTo(Brand)
Brand.hasMany(Product)
Review.belongsTo(User)
User.hasMany(Review)
User.hasMany(UserOrder)
UserOrder.belongsTo(User)
UserOrder.hasMany(OrderProduct)
OrderProduct.belongsTo(UserOrder)
OrderProduct.belongsTo(Product)
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
  Image,
  UserOrder,
  OrderProduct
}
