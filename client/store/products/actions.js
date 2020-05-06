import axios from 'axios'
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  READ_PRODUCT,
  READ_PRODUCTS,
  UPDATE_PRODUCT
} from './action_types'

const _createProduct = product => {
  return {
    type: CREATE_PRODUCT,
    product
  }
}

const _deleteProduct = product => {
  return {
    type: DELETE_PRODUCT,
    product
  }
}

const _readProduct = product => {
  return {
    type: READ_PRODUCT,
    product
  }
}

const _readProducts = products => {
  return {
    type: READ_PRODUCTS,
    products
  }
}

const _updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

const createProduct = product => {
  return async dispatch => {
    const createdProduct = (await axios.post('/api/products', product)).data
    dispatch(_createProduct(createdProduct))
  }
}

const deleteProduct = product => {
  return async dispatch => {
    await axios.delete(`/api/products/${product.id}`)
    dispatch(_deleteProduct(product))
  }
}

const readProduct = id => {
  return async dispatch => {
    const _product = (await axios.get(`/api/products/${id}`)).data
    dispatch(_readProduct(_product))
  }
}

const readProducts = () => {
  return async dispatch => {
    const products = (await axios.get('/api/products')).data
    dispatch(_readProducts(products))
  }
}

const updateProduct = product => {
  return async dispatch => {
    const updatedProduct = (await axios.put(
      `/api/products/${product.id}`,
      product
    )).data
    dispatch(_updateProduct(updatedProduct))
  }
}

export {createProduct, deleteProduct, readProduct, readProducts, updateProduct}
