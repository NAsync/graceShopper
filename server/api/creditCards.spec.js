const {expect} = require('chai')
const request = require('supertest')
const app = require('../index')
// make sure you npm run seed first for tests to work
describe('credit card routes', () => {
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
      await request(app)
        .delete(`/api/creditCards/${cardNum}`)
        .expect(204)

      const res = await request(app).get('/api/creditCards/')

      expect(res.body.length).to.be.equal(1)
    })
  }) // end describe('/api/creditCards')
}) // end describe('creditCard routes')

describe('merchant routes', () => {
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
      await request(app)
        .delete(`/api/merchants/3`)
        .expect(204)

      const res = await request(app).get('/api/merchants/')

      expect(res.body.length).to.be.equal(1)
    })
  }) // end describe('/api/merchants')
}) // end describe('merchants routes')
