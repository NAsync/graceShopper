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

const addItem = (product, userOrderId, quantity = 1) => {
  const productId = product.id
  // handle logged out cart
  if (userOrderId === 'offline') {
    console.log('added item for logged out user')
    const cart = JSON.parse(sessionStorage.cart)
    const newItem = {
      id: cart.orderProducts.reduce(
        (accum, cur) => (accum <= cur.id ? cur.id + 1 : accum),
        1
      ),
      quantity: 1,
      userOrderId: 'offline',
      productId: product.id,
      product,
      totalPrice: product.price
    }
    cart.orderProducts = [...cart.orderProducts, newItem]
    const newCart = JSON.stringify(cart)
    sessionStorage.cart = newCart
    return dispatch => dispatch(_addItem(newItem))
  }
  //handle logged in cart
  return async dispatch => {
    const addedItem = (await axios.post('/api/orderProducts', {
      productId,
      userOrderId,
      quantity
    })).data
    dispatch(_addItem(addedItem))
  }
}

const updateItem = (orderId, quantity, cartId) => {
  return async dispatch => {
    if (cartId !== 'offline') {
      //handle logged in uder
      const updatedItem = (await axios.put(`/api/orderProducts/${orderId}`, {
        quantity
      })).data
      dispatch(_updateItem(updatedItem))
    } else {
      // handle logged out user
      console.log('updated item for logged out user')
      const cart = JSON.parse(sessionStorage.cart)
      const updatedOrderProducts = cart.orderProducts.map(orderProduct => {
        if (orderProduct.id === orderId) {
          orderProduct.quantity = quantity
          orderProduct.totalPrice = orderProduct.product.price * quantity
        }
        return orderProduct
      })
      cart.orderProducts = updatedOrderProducts
      sessionStorage.cart = JSON.stringify(cart)
      dispatch(
        _updateItem(
          updatedOrderProducts.find(orderProduct => orderProduct.id === orderId)
        )
      )
    }
  }
}

const deleteItem = (orderId, cartId) => {
  return async dispatch => {
    //handle logged in user
    if (cartId !== 'offline') {
      await axios.delete(`/api/orderProducts/${orderId}`)
      dispatch(_deleteItem(orderId))
    } else {
      //handle logged out user
      console.log('deleted item for logged out user')
      const cart = JSON.parse(sessionStorage.cart)
      const deleteOrderProduct = cart.orderProducts.filter(
        orderProduct => orderProduct.id !== orderId
      )
      cart.orderProducts = deleteOrderProduct
      sessionStorage.cart = JSON.stringify(cart)
      dispatch(_deleteItem(orderId))
    }
  }
}

const createCart = userId => {
  return async dispatch => {
    const createdCart = (await axios.post('/api/userOrders', {userId})).data
    dispatch(_createCart(createdCart))
  }
}

const readCart = (userId = false) => {
  return async dispatch => {
    if (userId) {
      const cart = (await axios.get(`/api/userOrders/cart/${userId}`)).data
      dispatch(_readCart(cart[0]))
    } else {
      console.log('read item for logged out user')
      if (!sessionStorage.getItem('cart')) {
        sessionStorage.setItem(
          'cart',
          JSON.stringify({
            id: 'offline',
            isCheckedOut: false,
            userId: false,
            orderProducts: []
          })
        )
      }
      const cart = sessionStorage.getItem('cart')
      dispatch(_readCart(JSON.parse(cart)))
    }
  }
}

const checkoutCart = userId => {
  return async dispatch => {
    const cart = (await axios.put(`/api/userOrders/cart/${userId}`, {
      isCheckedOut: true
    })).data
    dispatch(_readCart(cart[0]))
  }
}
export {addItem, updateItem, deleteItem, createCart, readCart, checkoutCart}
