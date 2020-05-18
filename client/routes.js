import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Admin,
  AdminProductCreate,
  AdminProducts,
  AdminProductSingle,
  Cart,
  Login,
  Signup,
  UserHome
} from './components'
import {me} from './store'
import Products from './components/products'
import DepartmentsSlide from './components/departmentsSlide'
import ProductDetail from './components/productDetail'
import Brand from './components/brand'
import Department from './components/department'
import {readBrand} from '../client/store/brands/actions'
import {readDepartment} from '../client/store/departments/actions'
import {readProduct} from './store/products/actions'
import Checkout from './components/checkout'
import Success from './components/success'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isAdmin, isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={DepartmentsSlide} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/products" component={Products} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/success" component={Success} />
        <Route
          exact
          path="/brand/:id"
          render={({match}) => {
            this.props.loadBrand(match.params.id)
            return <Brand />
          }}
        />
        <Route
          exact
          path="/department/:id"
          render={({match}) => {
            this.props.loadDepartment(match.params.id)
            return <Department />
          }}
        />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            {isAdmin && (
              <Switch>
                <Route exact path="/admin" component={Admin} />
                <Route
                  exact
                  path="/admin/products/create"
                  component={AdminProductCreate}
                />
                <Route exact path="/admin/products" component={AdminProducts} />
                <Route
                  exact
                  path="/admin/products/:id"
                  render={({match}) => {
                    const id = match.params.id
                    this.props.loadProduct(id)
                    return <AdminProductSingle />
                  }}
                />
              </Switch>
            )}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isAdmin: state.user.isAdmin,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadBrand: id => {
      dispatch(readBrand(id))
    },
    loadDepartment: id => {
      dispatch(readDepartment(id))
    },
    loadProduct: id => {
      dispatch(readProduct(id))
    }
  }
}
// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
