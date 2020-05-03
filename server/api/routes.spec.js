const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Brand = db.model('brand')
const Department = db.model('department')
const Review = db.model('review')
const User = db.model('user')

describe('Department, Products, Reviews, and Brand routes', () => {
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

  describe('/api/products/', () => {
    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(product1.name)
      expect(res.body[1].price).to.be.equal(product2.price)
    })

    it('GET /api/products/:id', async () => {
      const res = await request(app)
        .get(`/api/products/${product1.id}`)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(product1.name)
      expect(res.body.price).to.be.equal(product1.price)
      expect(res.body.reviews[0].rating).to.be.equal(review2.rating)
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
      const myUpdate = {
        price: 13,
        inventoryQTY: 5
      }
      const res = await request(app)
        .put(`/api/products/${product1.id}`)
        .send(myUpdate)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(product1.name)
      expect(res.body.price).to.be.equal(myUpdate.price)
      expect(res.body.inventoryQTY).to.be.equal(myUpdate.inventoryQTY)
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

  describe('/api/departments/', () => {
    it('GET /api/departments', async () => {
      const res = await request(app)
        .get('/api/departments/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(department1.name)
      expect(res.body.length).to.be.equal(2)
    })

    it('GET /api/departments/:id', async () => {
      const res = await request(app)
        .get(`/api/departments/${department1.id}`)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(department1.name)
      expect(res.body.products[0].name).to.be.equal(product1.name)
    })
    it('POST /api/departments', async () => {
      const department3 = {
        name: 'toilet paper'
      }
      const res = await request(app)
        .post('/api/departments/')
        .send(department3)
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(department3.name)
    })

    it('UPDATES /api/departments/:id', async () => {
      const departmentUpdate = {
        name: 'new-health'
      }
      const res = await request(app)
        .put(`/api/departments/${department1.id}`)
        .send(departmentUpdate)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(departmentUpdate.name)
    })

    it('DELETES /api/departments/:id', async () => {
      await request(app)
        .delete(`/api/departments/${department1.id}`)
        .expect(204)
      const res = await request(app)
        .get('/api/departments/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(department2.name)
      expect(res.body.length).to.be.equal(1)
    })
  })
  // end describe('/api/departments')

  describe('/api/brands/', () => {
    it('GET /api/brands', async () => {
      const res = await request(app)
        .get('/api/brands/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(brand1.name)
      expect(res.body.length).to.be.equal(2)
    })
    it('GET /api/brands/:id', async () => {
      const res = await request(app)
        .get(`/api/brands/${brand1.id}`)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(brand1.name)
      expect(res.body.products[0].name).to.be.equal(product1.name)
    })
    it('POST /api/brands', async () => {
      const brand3 = {
        name: 'charmin'
      }
      const res = await request(app)
        .post('/api/brands/')
        .send(brand3)
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(brand3.name)
    })

    it('UPDATES /api/brands/:id', async () => {
      const brandUpdate = {
        name: '40M'
      }
      const res = await request(app)
        .put(`/api/brands/${brand1.id}`)
        .send(brandUpdate)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(brandUpdate.name)
    })

    it('DELETES /api/brands/:id', async () => {
      await request(app)
        .delete(`/api/brands/${brand1.id}`)
        .expect(204)
      const res = await request(app)
        .get('/api/brands/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(brand2.name)
      expect(res.body.length).to.be.equal(1)
    })
  }) // end describe('/api/brands/')

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
  }) // end describe('/api/brands/')
  describe('/api/users/', () => {
    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(user1.email)
    })
    it('GET /api/users/:id', async () => {
      const res = await request(app)
        .get(`/api/users/${user1.id}`)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal(user1.email)
      expect(res.body.reviews[0].description).to.be.equal(review1.description)
    })
  }) // end describe('/api/users')
}) // end describe('routes')
