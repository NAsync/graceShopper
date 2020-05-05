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

const mapStateToProps = ({products, reviews}) => {
  console.log('products', products)
  console.log('reviews', reviews)
  if (!products) {
    return {}
  }
  return {
    products,
    reviews
  }
}

export default connect(mapStateToProps)(Products)
