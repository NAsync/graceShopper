import React from 'react'
import {AdminProductSingle} from './adminProductSingle'
import {connect} from 'react-redux'

const AdminProducts = () => {
  const {products} = this.props
  return (
    <ul>
      {products.map(product => (
        <AdminProductSingle key={product.id} product={product} />
      ))}
    </ul>
  )
}

const mapStateToProps = ({products}) => {
  return {
    products
  }
}

export default connect(mapStateToProps)(AdminProducts)
