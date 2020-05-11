import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ReviewStars from './reviewStars'

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
        <img
          src={product.imageURL}
          alt={product.name}
          className="productCardImg"
        />
      </div>
      <Link to={'/products/' + product.id} className="cardItem productNameUnit">
        {product.name} {product.unit}
      </Link>
      <div className="cardItem productBrand">by {product.brand.name}</div>
      {review === 'First To Review' ? (
        <div className="cardItem productReview">{review}</div>
      ) : (
        <ReviewStars rating={review} />
      )}
      <div className="cardItem productPrice">${product.price}</div>
      <button className="addToCartBtn">Add to Cart</button>
    </div>
  )
}

export default ProductCard
