const app = require('../../index')
const db = require('../../db')
const Brand = db.model('brand')
const Department = db.model('department')
const {expect} = require('chai')
const Product = db.model('product')
const request = require('supertest')
const Review = db.model('review')
const User = db.model('user')

describe('Products Routes', () => {
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
      productId: product1.id
    })
    review2 = await Review.create({
      rating: 4,
      description: 'Nice! I can still breath.',
      userId: user2.id,
      productId: product1.id
    })
  })

  describe('/api/products/', () => {
    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(product1.name)
      expect(res.body[1].price).to.be.equal(product2.price)
      expect(Number(res.body[0].reviewAvg)).to.be.equal(
        (review1.rating + review2.rating) / 2
      )
    })

    it('GET /api/products/:id', async () => {
      const res = await request(app)
        .get(`/api/products/${product1.id}`)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(product1.name)
      expect(res.body.price).to.be.equal(product1.price)
      expect(res.body.reviews[0].rating).to.be.equal(review1.rating)
    })
    it('POST /api/products', async () => {
      const product3 = {
        name: 'Safety Eyewear',
        unit: '2 PC',
        description:
          'KEEP YOUR EYES PERFECTLY PROTECTED; REMAIN COMFORTABLE AND STYLISH AT ALL TIMES',
        price: 20,
        imageURL: 'https://picsum.photos/250',
        inventoryQTY: 30,
        bestSeller: false,
        departmentId: department2.id,
        brandId: brand1.id
      }
      const res = await request(app)
        .post('/api/products/')
        .send(product3)
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(product3.name)
      expect(res.body.price).to.be.equal(product3.price)
    })

    it('UPDATES /api/products/:id', async () => {
      const productUpdate = {
        price: 13,
        inventoryQTY: 5
      }
      const res = await request(app)
        .put(`/api/products/${product1.id}`)
        .send(productUpdate)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(product1.name)
      expect(res.body.price).to.be.equal(productUpdate.price)
      expect(res.body.inventoryQTY).to.be.equal(productUpdate.inventoryQTY)
    })

    it('DELETES /api/products/:id', async () => {
      await request(app)
        .delete(`/api/products/${product1.id}`)
        .expect(204)
      const res = await request(app)
        .get('/api/products/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(product2.name)
      expect(res.body.length).to.be.equal(1)
    })
  })

  // end describe('/api/products')
})
