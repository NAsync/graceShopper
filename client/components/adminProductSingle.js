import React, {Component} from 'react'
import {connect} from 'react-redux'

class AdminProductSingle extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    const {product} = this.props
    const entries = Object.entries(product)
    return (
      <ul>
        {entries.map((entry, idx) => {
          return (
            <li key={idx}>
              {`${entry[0]}`}: {`${entry[1]}`}
            </li>
          )
        })}
      </ul>
    )
  }
}

const mapStateToProps = ({product}) => {
  return {
    product
  }
}

export default connect(mapStateToProps)(AdminProductSingle)
