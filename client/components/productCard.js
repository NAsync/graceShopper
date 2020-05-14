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
  if (product.images) {
    // If the product has images, try to find the image ending in 1
    mainImage = product.images.find(
      image => image.url[image.url.length - 5] === '1'
    )
    // If no such image exists, default to the first image available
    if (!mainImage) {
      mainImage = product.images[0]
    }
    // Once we have a valid image, we can just store the image's url
    mainImage = mainImage.url
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
          const orderProd =
            cart.orderProducts &&
            cart.orderProducts.find(
              orderProduct => orderProduct.productId === product.id
            )
          if (orderProd) {
            const quantity = orderProd.quantity + 1
            updateCart(orderProd.id, quantity, cart.id)
          } else {
            addToCart(product, cart.id)
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
    addToCart: (product, userOrderId) =>
      dispatch(addItem(product, userOrderId)),
    updateCart: (orderId, quantity, cartId) =>
      dispatch(updateItem(orderId, quantity, cartId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
