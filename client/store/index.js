import {brandReducer, brandsReducer} from './brands/reducers'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import {departmentReducer, departmentsReducer} from './departments/reducers'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productReducer, productsReducer} from './products/reducers'
import user from './user'
import {reviewReducer, reviewsReducer} from './reviews'
import {cartItemReducer} from './cart/reducers'
import {productSearchReducer} from './searchStore'

const reducer = combineReducers({
  brand: brandReducer,
  brands: brandsReducer,
  department: departmentReducer,
  departments: departmentsReducer,
  product: productReducer,
  products: productsReducer,
  review: reviewReducer,
  reviews: reviewsReducer,
  user,
  cart: cartItemReducer,
  search: productSearchReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
