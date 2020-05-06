import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const AdminProducts = ({location, products}) => {
  const {pathname} = location
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <Link to={`${pathname}/${product.id}`}>{product.name}</Link>
        </li>
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
