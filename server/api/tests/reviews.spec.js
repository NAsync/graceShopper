const app = require('../../index')
const db = require('../../db')
const Brand = db.model('brand')
const Department = db.model('department')
const {expect} = require('chai')
const Product = db.model('product')
const request = require('supertest')
const Review = db.model('review')
const User = db.model('user')

describe('Reviews routes', () => {
  let user1
  let user2
  let brand1
  let brand2
  let department1
  let department2
  let product1
  let product2
  let review1
  let review2

  beforeEach(async () => {
    await db.sync({force: true})
    user1 = await User.create({email: 'cody@email.com', password: '123'})
    user2 = await User.create({
      email: 'murphy@email.com',
      password: '123'
    })
    brand1 = await Brand.create({name: '4M'})
    brand2 = await Brand.create({name: 'Whole Foods'})
    department1 = await Department.create({name: 'health'})
    department2 = await Department.create({name: 'grocery'})
    product1 = await Product.create({
      name: 'Nose Cover Scarf',
      unit: '1 PC',
      description: '100% Cotton; Face Mask for Dust & Sun Protection',
      price: 15,
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 25,
      bestSeller: false,
      departmentId: department1.id,
      brandId: brand1.id
    })

    product2 = await Product.create({
      name: 'Cotton Face Mask',
      unit: '3 PC',
      description:
        'Reusable, Washable, Protection from Dust, Pollen, Pet Dander and other Airborne Irritants',
      price: 30,
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 80,
      bestSeller: false,
      departmentId: department2.id,
      brandId: brand2.id
    })
    review1 = await Review.create({
      rating: 5,
      description: 'Awesome! I can still see.',
      userId: user1.id,
      productId: product2.id
    })
    review2 = await Review.create({
      rating: 4,
      description: 'Nice! I can still breath.',
      userId: user2.id,
      productId: product1.id
    })
  })

  describe('/api/reviews/', () => {
    it('GET /api/reviews', async () => {
      const res = await request(app)
        .get('/api/reviews/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].description).to.be.equal(review1.description)
      expect(res.body.length).to.be.equal(2)
    })
    it('POST /api/reviews', async () => {
      const review3 = {
        id: 3,
        rating: 4,
        description: 'Not Bad.',
        userId: user1.id,
        productId: product1.id
      }
      const res = await request(app)
        .post('/api/reviews/')
        .send(review3)
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body.rating).to.be.equal(review3.rating)
      expect(res.body.description).to.be.equal(review3.description)
    })

    it('UPDATES /api/reviews/:id', async () => {
      const reviewUpdate = {
        description: 'Not as good as I thought'
      }
      const res = await request(app)
        .put(`/api/reviews/${review1.id}`)
        .send(reviewUpdate)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.description).to.be.equal(reviewUpdate.description)
    })

    it('DELETES /api/reviews/:id', async () => {
      await request(app)
        .delete(`/api/reviews/${review1.id}`)
        .expect(204)
      const res = await request(app)
        .get('/api/reviews/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].description).to.be.equal(review2.description)
      expect(res.body.length).to.be.equal(1)
    })
  }) // end describe('/api/reviews/')
})
