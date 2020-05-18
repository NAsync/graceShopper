import React from 'react'
import ProductCard from './productCard'
import {connect} from 'react-redux'

const ProductSearch = ({search}) => {
  const products = search
  return (
    <div>
      <div id="productsContainer">
        {products &&
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  )
}

const mapStateToProps = ({search}) => ({
  search
})

export default connect(mapStateToProps)(ProductSearch)
