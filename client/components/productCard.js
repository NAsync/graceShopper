import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const ProductCard = ({product}) => {
  let review = ''
  if (!product.reviewAvg) {
    review = 'First To Review'
  } else {
    review = parseFloat(product.reviewAvg).toFixed(1)
  }

  return (
    <div className="productCardContainer">
      <div className="imgContainer">
        <div
          className={
            product.bestSeller
              ? 'bestSeller bestSellerShow'
              : 'bestSeller bestSellerNotShow'
          }
        >
          Best Seller
        </div>
        <img src={product.imageURL} alt={product.name} />
      </div>
      <Link to={'/products/' + product.id} className="cardItem productNameUnit">
        {product.name} {product.unit}
      </Link>
      <div className="cardItem productBrand">by {product.brand.name}</div>
      <div className="cardItem productReview">{review}</div>
      <div className="cardItem productPrice">${product.price}</div>
      <button className="addToCartBtn">Add to Cart</button>
    </div>
  )
}

export default ProductCard
