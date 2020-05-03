import React, {Component} from 'react'
//import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import ProductCard from './productCard'

const Products = ({processed}) => {
  console.log('here', processed)

  return (
    <div id="productsContainer">
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  )
}

const mapStateToProps = ({products, reviews}) => {
  console.log('hihi', products)
  if (!products) {
    return {}
  }
  const processed = products.map(product => {
    return {
      ...product,
      reviews: reviews.filter(review => review.productId === product.id)
    }
  })
  return {
    processed
  }
}

export default connect(mapStateToProps)(Products)

//export default Products
