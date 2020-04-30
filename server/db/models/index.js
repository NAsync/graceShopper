const User = require('./user')
const Product = require('./product')
const Review = require('./review')
const Department = require('./department')
const Brand = require('./brand')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Product.belongsTo(Department)
Department.hasMany(Product)
Product.belongsTo(Brand)
Brand.hasMany(Product)
Review.belongsTo(User)
User.hasMany(Review)
Review.belongsTo(Product)
Product.hasMany(Review)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Product,
  Review,
  Department,
  Brand
}
