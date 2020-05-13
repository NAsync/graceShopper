import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addItem, updateItem} from '../store/cart/actions'
import ReviewStars from './reviewStars'

const ProductCard = ({product, addToCart, cart, updateCart}) => {
  let review = ''
  if (!product.reviewAvg) {
    review = 'First To Review'
  } else {
    review = parseFloat(product.reviewAvg).toFixed(1)
  }

  let mainImage = ''
  if (product.images && product.images[0]) {
    mainImage = product.images[0].url
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
        <img src={mainImage} alt={product.name} className="productCardImg" />
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
          const orderProd = cart.orderProducts.find(
            orderProduct => orderProduct.productId === product.id
          )
          if (orderProd) {
            const quantity = orderProd.quantity + 1
            updateCart(orderProd.id, quantity)
          } else {
            addToCart(product.id, cart.id)
          }
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
      dispatch(addItem(productId, userOrderId)),
    updateCart: (id, quantity) => dispatch(updateItem(id, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
