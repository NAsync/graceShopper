import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './productCard'

const Brand = ({brand}) => {
  return (
    <div>
      <h1>{brand.name}</h1>
      <div id="productsContainer">
        {brand.products &&
          brand.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  )
}

const mapStateToProps = ({brand}) => {
  return {
    brand
  }
}

export default connect(mapStateToProps)(Brand)
