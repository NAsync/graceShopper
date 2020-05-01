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
  beforeEach(async () => {
    await db.sync({force: true})
    await User.create({email: 'cody@email.com', password: '123'})
    await User.create({email: 'murphy@email.com', password: '123'})
    await Brand.create({name: '4M'})
    await Brand.create({name: 'Whole Foods'})
    await Department.create({name: 'health'})
    await Department.create({name: 'grocery'})
    await Product.create({
      name: 'Nose Cover Scarf',
      unit: '1 PC',
      description: '100% Cotton; Face Mask for Dust & Sun Protection',
      price: 15,
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 25,
      bestSeller: false,
      departmentId: 1,
      brandId: 1
    })

    await Product.create({
      name: 'Cotton Face Mask',
      unit: '3 PC',
      description:
        'Reusable, Washable, Protection from Dust, Pollen, Pet Dander and other Airborne Irritants',
      price: 30,
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 80,
      bestSeller: false,
      departmentId: 2,
      brandId: 2
    })
    await Review.create({
      rating: 5,
      description: 'Awesome! I can still see.',
      userId: 1,
      productId: 2
    })
    await Review.create({
      rating: 4,
      description: 'Nice! I can still breath.',
      userId: 2,
      productId: 1
    })
  })

  describe('/api/products/', () => {
    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Nose Cover Scarf')
      expect(res.body[1].price).to.be.equal(30)
    })
    it('POST /api/products', async () => {
      const res = await request(app)
        .post('/api/products/')
        .send({
          name: 'Safety Eyewear',
          unit: '2 PC',
          description:
            'KEEP YOUR EYES PERFECTLY PROTECTED; REMAIN COMFORTABLE AND STYLISH AT ALL TIMES',
          price: 20,
          imageURL: 'https://picsum.photos/250',
          inventoryQTY: 30,
          bestSeller: false,
          departmentId: 2,
          brandId: 1
        })
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Safety Eyewear')
      expect(res.body.price).to.be.equal(20)
    })

    it('UPDATES /api/products/:id', async () => {
      const res = await request(app)
        .put('/api/products/1')
        .send({
          price: 13,
          inventoryQTY: 5
        })
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Nose Cover Scarf')
      expect(res.body.price).to.be.equal(13)
      expect(res.body.inventoryQTY).to.be.equal(5)
    })

    it('DELETES /api/products/:id', async () => {
      await request(app)
        .delete('/api/products/1')
        .expect(204)
      const res = await request(app)
        .get('/api/products/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Cotton Face Mask')
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
      expect(res.body[0].name).to.be.equal('health')
      expect(res.body.length).to.be.equal(2)
    })
    it('POST /api/departments', async () => {
      const res = await request(app)
        .post('/api/departments/')
        .send({
          name: 'toilet paper'
        })
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('toilet paper')
    })

    it('UPDATES /api/departments/:id', async () => {
      const res = await request(app)
        .put('/api/departments/1')
        .send({
          name: 'new-health'
        })
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('new-health')
    })

    it('DELETES /api/departments/:id', async () => {
      await request(app)
        .delete('/api/departments/1')
        .expect(204)
      const res = await request(app)
        .get('/api/departments/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('grocery')
      expect(res.body.length).to.be.equal(1)
    })
  })
  // end describe('/api/departments)

  describe('/api/brands/', () => {
    it('GET /api/brands', async () => {
      const res = await request(app)
        .get('/api/brands/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('4M')
      expect(res.body.length).to.be.equal(2)
    })
    it('POST /api/brands', async () => {
      const res = await request(app)
        .post('/api/brands/')
        .send({
          name: 'charmin'
        })
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('charmin')
    })

    it('UPDATES /api/brands/:id', async () => {
      const res = await request(app)
        .put('/api/brands/1')
        .send({
          name: '40M'
        })
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('40M')
    })

    it('DELETES /api/brands/:id', async () => {
      await request(app)
        .delete('/api/brands/1')
        .expect(204)
      const res = await request(app)
        .get('/api/brands/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Whole Foods')
      expect(res.body.length).to.be.equal(1)
    })
  }) // end describe('/api/brands/)

  describe('/api/reviews/', () => {
    it('GET /api/reviews', async () => {
      const res = await request(app)
        .get('/api/reviews/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].description).to.be.equal('Awesome! I can still see.')
      expect(res.body.length).to.be.equal(2)
    })
    it('POST /api/reviews', async () => {
      const res = await request(app)
        .post('/api/reviews/')
        .send({
          id: 3,
          rating: 4,
          description: 'Not Bad.',
          userId: 1,
          productId: 1
        })
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body.rating).to.be.equal(4)
      expect(res.body.description).to.be.equal('Not Bad.')
    })

    it('UPDATES /api/reviews/:id', async () => {
      const res = await request(app)
        .put('/api/reviews/1')
        .send({
          description: 'Not as good as I thought'
        })
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.description).to.be.equal('Not as good as I thought')
    })

    it('DELETES /api/reviews/:id', async () => {
      await request(app)
        .delete('/api/reviews/1')
        .expect(204)
      const res = await request(app)
        .get('/api/reviews/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].description).to.be.equal('Nice! I can still breath.')
      expect(res.body.length).to.be.equal(1)
    })
  }) // end describe('/api/brands/)
}) // end describe('routes')
