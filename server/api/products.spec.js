const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Brand = db.model('brand')
const Department = db.model('department')

describe('Product routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
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
}) // end describe('Product routes')
