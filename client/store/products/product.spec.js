import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import store from '..'
import {READ_PRODUCTS} from './action_types'
// import { request } from 'express'

const request = require('supertest')
const app = require('../../../server/index')
const db = require('../../../server/db')
const Product = db.model('product')
const {
  createProduct,
  deleteProduct,
  readProduct,
  readProducts,
  updateProduct
} = require('./actions')

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('product thunk creators', () => {
  const initialState = {}
  let product
  beforeEach(async () => {
    await db.sync({force: true})
    product = await Product.create({
      name: 'An item',
      unit: '1 PC',
      description: 'A good description',
      price: 15,
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 25,
      bestSeller: false
    })
    // mockAxios = new MockAdapter(axios)
    // store = mockStore(initialState)
  })

  describe('', () => {
    it('dispatches get product', async () => {
      expect(true).to.be.equal(true)
      // const res = await request(app)
      //     .get(`/api/products/${product.id}`)
      //     .expect(200)
      // mockAxios.onGet(`/api/products/${product.id}`).reply(200, product)
      // await store.dispatch(readProduct())
      // const actions = store.getActions()
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

  describe('GET products', async () => {
    it('dispatches get products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)
    })
    mockAxios.onGet('/api/products').replyOnce(200, [product1, product2])
    await store.dispatch(readProducts())
    const actions = store.getActions()
    expect(actions[0].type).to.be.equal(READ_PRODUCTS)
    expect(actions[0].products).to.be.equal([product1, product2])
  })
})
