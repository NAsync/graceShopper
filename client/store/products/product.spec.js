import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {READ_PRODUCT, READ_PRODUCTS} from './action_types'
const axios = require('axios')
const {expect} = require('chai')
const request = require('supertest')
const app = require('../../../server/index')
const db = require('../../../server/db')
const Product = db.model('product')
const {readProduct, readProducts} = require('./actions')

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('product thunk creators', () => {
  let store
  let mockAxios
  const initialState = {product: {}}
  let product
  beforeEach(async () => {
    await db.sync({force: true})
    product = (await Product.create({
      name: 'An item',
      unit: '1 PC',
      description: 'A good description',
      price: 15,
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 25,
      bestSeller: false
    })).dataValues
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })
  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('GET product', () => {
    it('dispatches get product', async () => {
      mockAxios.onGet(`/api/products/${product.id}`).replyOnce(200, product)
      await store.dispatch(readProduct(product))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal(READ_PRODUCT)
      expect(actions[0].product.name).to.be.equal(product.name)
      expect(actions[0].product.id).to.be.equal(product.id)
    })
  })
})

describe('products thunk creators', () => {
  let store
  let mockAxios
  const initialState = {products: []}
  let product1
  let product2
  beforeEach(async () => {
    await db.sync({force: true})
    product1 = await Product.create({
      name: 'An item',
      unit: '1 PC',
      description: '100% Cotton; Face Mask for Dust & Sun Protection',
      price: 15,
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 25,
      bestSeller: false
    })
    product2 = await Product.create({
      name: 'Some other item',
      unit: '1 PC',
      description: 'Item description',
      price: 4,
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 3,
      bestSeller: true
    })
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })
  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('GET products', () => {
    it('dispatches get products', async () => {
      // mockAxios.onGet('/api/products').reply(200, [product1, product2])
      // await store.dispatch(readProducts())
      // const actions = store.getActions()
      // console.log('actions here', actions)
      // expect(actions[0].type).to.be.equal(READ_PRODUCTS)
      // expect(actions[0].products).to.be.equal(res.body)
    })
  })
})
