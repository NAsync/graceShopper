const PRODUCT_SEARCH = 'PRODUCT_SEARCH'
const _productSearchStore = products => {
  return {
    type: PRODUCT_SEARCH,
    products
  }
}

const productSearchStore = products => {
  return dispatch => {
    dispatch(_productSearchStore(products))
  }
}

export const productSearchReducer = (state = [], action) => {
  switch (action.type) {
    case PRODUCT_SEARCH:
      return action.products
    default:
      return state
  }
}

export default productSearchStore
