import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addItem} from '../store/cart/actions'
import ReviewStars from './reviewStars'

const ProductCard = ({product, addToCart, cart}) => {
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
      <button
        className="addToCartBtn"
        onClick={() => {
          addToCart(product.id, cart.id)
        }}
      >
        Add to Cart
      </button>
    </div>
  )
}

const mapStateToProps = ({cart}) => {
  return {
    cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (productId, userOrderId) =>
      dispatch(addItem(productId, userOrderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
