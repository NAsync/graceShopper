import axios from 'axios'
import {ADD_ITEM, CREATE_CART, DELETE_ITEM, UPDATE_ITEM} from './action_types'

const _addItem = item => {
  return {
    type: ADD_ITEM,
    item
  }
}

const _deleteItem = item => {
  return {
    type: DELETE_ITEM,
    item
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

const addItem = item => {
  return async dispatch => {
    const addedItem = (await axios.post('/api/orderProducts', item)).data
    dispatch(_addItem(addedItem))
  }
}

const updateItem = item => {
  return async dispatch => {
    const updatedItem = (await axios.put(`/api/orderProducts/${item.id}`, item))
      .data
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
    const createdCart = (await axios.post('/api/orderProducts', {userId})).data
    dispatch(_createCart(createdCart))
  }
}

export {addItem, updateItem, deleteItem, createCart}
