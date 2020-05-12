import React, {Component} from 'react'
import {Navbar} from './components'
import SideNavbar from './components/sideNav'
import Routes from './routes'
import {connect} from 'react-redux'
import {readProducts} from './store/products/actions'
import {readBrands} from './store/brands/actions'
import {readDepartments} from './store/departments/actions'
import {readReviews} from './store/reviews'
import {readCart} from './store/cart/actions'

class App extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.load()
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id) {
      this.props.loadCart(this.props.user.id)
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

const mapStateToProps = ({user}) => {
  return {
    user
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
    loadCart: userId => dispatch(readCart(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
