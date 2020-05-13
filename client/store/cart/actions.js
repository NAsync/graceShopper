import axios from 'axios'
import {
  ADD_ITEM,
  CREATE_CART,
  DELETE_ITEM,
  UPDATE_ITEM,
  READ_CART
} from './action_types'

const _addItem = item => {
  return {
    type: ADD_ITEM,
    item
  }
}

const _deleteItem = id => {
  return {
    type: DELETE_ITEM,
    id
  }
}

const _createCart = cart => {
  return {
    type: CREATE_CART,
    cart
  }
}
const _updateItem = item => {
  return {
    type: UPDATE_ITEM,
    item
  }
}

const _readCart = cart => {
  return {
    type: READ_CART,
    cart
  }
}

const addItem = (productId, userOrderId) => {
  return async dispatch => {
    const addedItem = (await axios.post('/api/orderProducts', {
      productId,
      userOrderId
    })).data
    dispatch(_addItem(addedItem))
  }
}

const updateItem = (id, quantity) => {
  return async dispatch => {
    const updatedItem = (await axios.put(`/api/orderProducts/${id}`, {
      quantity
    })).data
    dispatch(_updateItem(updatedItem))
  }
}

const deleteItem = id => {
  return async dispatch => {
    await axios.delete(`/api/orderProducts/${id}`)
    dispatch(_deleteItem(id))
  }
}

const createCart = userId => {
  return async dispatch => {
    const createdCart = (await axios.post('/api/userOrders', {userId})).data
    dispatch(_createCart(createdCart))
  }
}

const readCart = userId => {
  return async dispatch => {
    const cart = (await axios.get(`/api/userOrders/cart/${userId}`)).data
    dispatch(_readCart(cart[0]))
  }
}
export {addItem, updateItem, deleteItem, createCart, readCart}
