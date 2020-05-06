import React, {Component} from 'react'
import {connect} from 'react-redux'

class AdminProductSingle extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    const product = this.props
    console.log('in single', product)
    return <div>single view howdy</div>
  }
}

const mapStateToProps = ({product}) => {
  return {
    product
  }
}

export default connect(mapStateToProps)(AdminProductSingle)
