const {expect} = require('chai')
const request = require('supertest')
const app = require('../index')
const db = require('../db')
const CreditCard = db.model('creditCard')
const User = db.model('user')
const Merchant = db.model('merchant')

describe('credit card and merchant routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  beforeEach(() => {
    return User.create({
      email: 'codyemail@gmail.com'
    })
  })

  beforeEach(() => {
    return User.create({
      email: 'janeemail@gmail.com'
    })
  })

  beforeEach(() => {
    return Merchant.create({
      name: 'MasterCard',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg'
    })
  })

  beforeEach(() => {
    return Merchant.create({
      name: 'Visa',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/5/53/Visa_2014_logo_detail.svg'
    })
  })

  beforeEach(() => {
    return CreditCard.create({
      ccNumber: '5715121212151515',
      userId: 1,
      merchantId: 1
    })
  })

  beforeEach(() => {
    return CreditCard.create({
      ccNumber: '5215818121211512',
      userId: 2,
      merchantId: 2
    })
  })

  describe('/api/creditCards/', () => {
    const cardNum = '5215818121211584'
    const userId = 1
    const merchantId = 1

    it('GET /api/creditCards', async () => {
      const res = await request(app)
        .get('/api/creditCards/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(2)
    })

    it('POST /api/creditCards/', async () => {
      const res = await request(app)
        .post('/api/creditCards/')
        .send({ccNumber: cardNum, userId, merchantId})
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body.ccNumber).to.be.equal(cardNum)
      expect(res.body.userId).to.be.equal(userId)
      expect(res.body.merchantId).to.be.equal(merchantId)
    })

    it('DELETE /api/creditCards/', async () => {
      await request(app)
        .delete('/api/creditCards/5215818121211512')
        .expect(204)

      const res = await request(app).get('/api/creditCards/')

      expect(res.body.length).to.be.equal(1)
    })
  }) // end describe('/api/creditCards')
  describe('/api/merchants/', () => {
    it('GET /api/merchants', async () => {
      const res = await request(app)
        .get('/api/merchants/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(2)
    })

    it('POST /api/merchants/', async () => {
      const res = await request(app)
        .post('/api/merchants/')
        .send({
          name: 'Discover',
          imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg'
        })
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Discover')
      expect(res.body.imageUrl).to.be.equal(
        'https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg'
      )
    })

    it('DELETE /api/merchants/', async () => {
      await request(app)
        .delete('/api/merchants/1')
        .expect(204)

      const res = await request(app).get('/api/merchants/')

      expect(res.body.length).to.be.equal(1)
    })
  }) // end describe('/api/merchants') // end describe('creditCard routes')
}) // end describe card and merchants
