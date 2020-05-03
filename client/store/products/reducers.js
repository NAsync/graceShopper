import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  READ_PRODUCT,
  READ_PRODUCTS,
  UPDATE_PRODUCT
} from './action_types'

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return [...state, action.product]
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.product.id)
    case READ_PRODUCT:
      return action.product
    case UPDATE_PRODUCT:
      return state.map(
        product => (product.id === action.product.id ? action.product : product)
      )
    default:
      return state
  }
}

export const productsReducer = (state = [], action) => {
  switch (action.type) {
    case READ_PRODUCTS:
      return action.products
    default:
      return state
  }
}
