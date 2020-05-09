import {
  CREATE_BRAND,
  DELETE_BRAND,
  READ_BRAND,
  READ_BRANDS,
  UPDATE_BRAND
} from './action_types'

export const brandReducer = (state = {}, action) => {
  switch (action.type) {
    case READ_BRAND:
      return action.brand
    default:
      return state
  }
}

export const brandsReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_BRAND:
      return [...state, action.brand]
    case DELETE_BRAND:
      return state.filter(brand => brand.id !== action.brand.id)
    case UPDATE_BRAND:
      return state.map(
        brand => (brand.id === action.brand.id ? action.brand : brand)
      )
    case READ_BRANDS:
      return action.brands
    default:
      return state
  }
}
