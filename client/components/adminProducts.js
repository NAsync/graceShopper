import React from 'react'
import {AdminProductSingle} from './adminProductSingle'
import {connect} from 'react-redux'

const AdminProducts = ({products}) => {
  return (
    <ul>
      {products.map(product => (
        // <AdminProductSingle key={product.id} product={product} />
        <li>{product.name}</li>
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
