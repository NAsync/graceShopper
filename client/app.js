import React, {Component} from 'react'
import {Navbar} from './components'
import SideNavbar from './components/sideNav'
import Routes from './routes'
import {connect} from 'react-redux'
import {readProducts} from './store/products/actions'
import {readBrands} from './store/brands/actions'
import {readDepartments} from './store/departments/actions'
import {readReviews} from './store/reviews'
import {readCart, addItem, updateItem} from './store/cart/actions'

class App extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.load()
    this.props.loadCart()
  }

  async componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id) {
      await this.props.loadCart(this.props.user.id)
      const sessionCart = JSON.parse(sessionStorage.cart) || {}
      if (this.props.user.id) {
        sessionCart.orderProducts.forEach(orderProduct => {
          const inCart = this.props.cart.orderProducts.find(
            op => op.productId === orderProduct.productId
          )
          if (inCart) {
            this.props.updateCart(
              inCart.id,
              inCart.quantity + orderProduct.quantity,
              this.props.cart.id
            )
          } else {
            this.props.addToCart(
              orderProduct.product,
              this.props.cart.id,
              orderProduct.quantity
            )
          }
        })
        sessionStorage.clear()
      }
    }
  }
  render() {
    return (
      <div>
        <SideNavbar />
        <Navbar />
        <Routes />
      </div>
    )
  }
}

const mapStateToProps = ({user, cart}) => {
  return {
    user,
    cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: () => {
      dispatch(readBrands())
      dispatch(readDepartments())
      dispatch(readProducts())
      dispatch(readReviews())
    },
    loadCart: userId => dispatch(readCart(userId)),
    addToCart: (product, userOrderId, quantity) =>
      dispatch(addItem(product, userOrderId, quantity)),
    updateCart: (orderId, quantity, cartId) =>
      dispatch(updateItem(orderId, quantity, cartId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
