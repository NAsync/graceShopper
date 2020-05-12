import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteItem} from '../store/cart/actions'
import products from './products'

const ProductCardCart = ({orderProduct, deleteFromCart}) => {
  const product = orderProduct.product
  if (product) {
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
        <Link
          to={'/products/' + product.id}
          className="cardItem productNameUnit"
        >
          {product.name} {product.unit}
        </Link>
        <div className="cardItem productBrand">by {product.brand.name}</div>
        <div className="cardItem productReview">
          {Number(product.reviewAvg).toFixed(1)}
        </div>
        <div className="cardItem productPrice">${product.price}</div>
        <button
          className="addToCartBtn"
          onClick={() => deleteFromCart(orderProduct.id)}
        >
          Delete from cart
        </button>
      </div>
    )
  }
  return null
}

const mapStateToProps = ({user}) => {
  if (user) {
    return {
      user
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteFromCart: id => dispatch(deleteItem(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardCart)
