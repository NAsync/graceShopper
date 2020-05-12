import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteItem, updateItem} from '../store/cart/actions'

const ProductCardCart = ({orderProduct, deleteFromCart, updateCart}) => {
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
        <div className="cardItem productPrice">
          Total ${orderProduct.totalPrice}
        </div>
        <div className="cardItem productPrice">${product.price} per</div>

        <div className="cardItem productReview">
          quantity {orderProduct.quantity}
        </div>
        <button
          className="addToCartBtn"
          onClick={() => {
            if (orderProduct.quantity > 1) {
              const quantity = orderProduct.quantity - 1
              updateCart(orderProduct.id, quantity)
            } else {
              deleteFromCart(orderProduct.id)
            }
          }}
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
    deleteFromCart: id => dispatch(deleteItem(id)),
    updateCart: (id, quantity) => dispatch(updateItem(id, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardCart)
