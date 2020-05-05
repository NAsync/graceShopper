import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productReducer, productsReducer} from './products/reducers'
import user from './user'
import brands from './brands'
import departments from './departments'
import reviews from './departments'

const reducer = combineReducers({
  product: productReducer,
  products: productsReducer,
  user
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
