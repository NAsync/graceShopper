import React, {Component} from 'react'
//import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import ProductCard from './productCard'

const Products = ({products}) => {
  return (
    <div id="productsContainer">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

const mapStateToProps = ({products}) => {
  console.log('products', products)
  if (!products) {
    return {}
  }
  return {
    products
  }
}

export default connect(mapStateToProps)(Products)
