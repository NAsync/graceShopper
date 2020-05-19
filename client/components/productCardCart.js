import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteItem, updateItem} from '../store/cart/actions'

const ProductCardCart = ({orderProduct, deleteFromCart, updateCart, cart}) => {
  const product = orderProduct.product
  if (product) {
    let bigImageUrl = product.images.find(
      image => image.url[image.url.length - 5] === '1'
    )
    if (!bigImageUrl) {
      bigImageUrl = {url: 'https://picsum.photos/250'}
    }
    bigImageUrl = bigImageUrl.url

    return (
      <div className="productCardContainerCart">
        <div className="imgContainerCart cartLeft">
          <div
            className={
              product.bestSeller
                ? 'bestSellerCart bestSellerShow'
                : 'bestSellerCart bestSellerNotShow'
            }
          >
            Best Seller
          </div>
          <img
            src={bigImageUrl}
            alt={product.name}
            className="productCardImgCart"
          />
        </div>
        <div className="cartRight">
          <div className="rowCart">
            <Link
              to={'/products/' + product.id}
              className="productNameUnitCart"
            >
              {product.name} {product.unit}
            </Link>
            <div className="productBrandCart">by {product.brand.name}</div>
          </div>
          <div className="rowCart">
            <button
              className="btnCart"
              onClick={() => {
                if (orderProduct.quantity > 1) {
                  const quantity = orderProduct.quantity - 1
                  updateCart(orderProduct.id, quantity, cart.id)
                } else {
                  deleteFromCart(orderProduct.id, cart.id)
                }
              }}
            >
              &minus;
            </button>
            <div className="orderQuantityCart">Qty {orderProduct.quantity}</div>
            <button
              className="btnCart"
              onClick={() => {
                const quantity = orderProduct.quantity + 1
                updateCart(orderProduct.id, quantity, cart.id)
              }}
            >
              &#43;
            </button>
          </div>
          <div className="rowCart">
            <div className="productPriceCart">${product.price}/Item</div>
            <div className="totalItemAmtCart">
              Item Total ${orderProduct.totalPrice}
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}

const mapStateToProps = ({cart}) => {
  return {
    cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteFromCart: (orderId, cartId) => dispatch(deleteItem(orderId, cartId)),
    updateCart: (orderId, quantity, cartId) =>
      dispatch(updateItem(orderId, quantity, cartId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardCart)
