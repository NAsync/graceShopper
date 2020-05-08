import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './productCard'

const Department = ({department}) => {
  return (
    <div>
      <h1>{department.name}</h1>
      <div id="productsContainer">
        {department.products &&
          department.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  )
}

const mapStateToProps = ({department}) => {
  return {
    department
  }
}

export default connect(mapStateToProps)(Department)
