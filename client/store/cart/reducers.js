import {ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, READ_CART} from './action_types'

export const cartItemReducer = (state = {}, action) => {
  switch (action.type) {
    case READ_CART:
      return action.cart
    case ADD_ITEM:
      return {...state, orderProducts: [...state.orderProducts, action.item]}
    case DELETE_ITEM:
      return {
        ...state,
        orderProducts: state.orderProducts.filter(item => item.id !== action.id)
      }
    case UPDATE_ITEM:
      return {
        ...state,
        orderProducts: state.orderProducts.map(item => {
          if (item.id === action.item.id) {
            item.quantity = action.item.quantity
            if (item.product) {
              item.totalPrice = item.product.price * item.quantity
            }
          }
          return {...item}
        })
      }
    default:
      return state
  }
}
