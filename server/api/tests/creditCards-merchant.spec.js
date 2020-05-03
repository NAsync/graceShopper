const app = require('../../index')
const db = require('../../db')
const CreditCard = db.model('creditCard')
const {expect} = require('chai')
const Merchant = db.model('merchant')
const request = require('supertest')
const User = db.model('user')

describe('credit card and merchant routes', () => {
  let user1
  let user2
  let merchant1
  let merchant2
  let creditCard1
  let creditCard2

  beforeEach(async () => {
    await db.sync({force: true})
    user1 = await User.create({
      email: 'codyemail@gmail.com'
    })
    user2 = await User.create({
      email: 'janeemail@gmail.com'
    })
    merchant1 = await Merchant.create({
      name: 'MasterCard',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg'
    })
    merchant2 = await Merchant.create({
      name: 'Visa',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/5/53/Visa_2014_logo_detail.svg'
    })
    creditCard1 = await CreditCard.create({
      ccNumber: '5715121212151515',
      userId: user1.id,
      merchantId: merchant1.id
    })
    creditCard2 = await CreditCard.create({
      ccNumber: '5215818121211512',
      userId: user2.id,
      merchantId: merchant2.id
    })
  })
  describe('/api/creditCards/', () => {
    it('GET /api/creditCards', async () => {
      const res = await request(app)
        .get('/api/creditCards/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(2)
    })

    it('POST /api/creditCards/', async () => {
      const creditCard3 = {
        ccNumber: '5215818121211584',
        userId: user1.id,
        merchantId: merchant2.id
      }
      const res = await request(app)
        .post('/api/creditCards/')
        .send(creditCard3)
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body.ccNumber).to.be.equal(creditCard3.ccNumber)
      expect(res.body.userId).to.be.equal(creditCard3.userId)
      expect(res.body.merchantId).to.be.equal(creditCard3.merchantId)
    })

    it('DELETE /api/creditCards/', async () => {
      await request(app)
        .delete(`/api/creditCards/${creditCard1.ccNumber}/`)
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
      const merchant3 = {
        name: 'Discover',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg'
      }
      const res = await request(app)
        .post('/api/merchants/')
        .send(merchant3)
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(merchant3.name)
      expect(res.body.imageUrl).to.be.equal(merchant3.imageUrl)
    })

    it('UPDATES /api/merchants/:id', async () => {
      const merchantUpdate = {
        name: 'American Express'
      }
      const res = await request(app)
        .put(`/api/merchants/${merchant1.id}`)
        .send(merchantUpdate)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(merchantUpdate.name)
    })

    it('DELETE /api/merchants/', async () => {
      await request(app)
        .delete(`/api/merchants/${merchant1.id}`)
        .expect(204)

      const res = await request(app).get('/api/merchants/')

      expect(res.body.length).to.be.equal(1)
    })
  }) // end describe('/api/merchants')
}) // end describe card and merchants
