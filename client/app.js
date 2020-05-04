import React, {Component} from 'react'
import {Navbar} from './components'
import Routes from './routes'
//import { connect } from 'http2';
import {connect} from 'react-redux'
import {readProduct, readProducts} from './store/products/actions'

//const App = () => {

class App extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log('hello', this.props)
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
      //dispatch(readProduct())
    }
  }
}

export default connect(null, mapDispatchToProps)(App)

//export default App
