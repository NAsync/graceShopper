import {ADD_ITEM, DELETE_ITEM, UPDATE_ITEM} from './action_types'

export const cartItemReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item]
    case DELETE_ITEM:
      return state.filter(item => item.id !== action.item.id)
    case UPDATE_ITEM:
      return state.map(
        item => (item.id === action.item.id ? action.item : item)
      )
    default:
      return state
  }
}
