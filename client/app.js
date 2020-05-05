import React, {Component} from 'react'
import {Navbar} from './components'
import Routes from './routes'
//import { connect } from 'http2';
import {connect} from 'react-redux'
import {readProducts} from './store/products/actions'
import {readReviews} from './store/reviews'

class App extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.load()
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: () => {
      dispatch(readProducts())
      dispatch(readReviews())
    }
  }
}

export default connect(null, mapDispatchToProps)(App)
