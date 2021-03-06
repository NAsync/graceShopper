import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {readProduct} from '../store/products/actions'
import ReviewStars from './reviewStars'
import {addItem, updateItem} from '../store/cart/actions'

//toDo list:
//1. bring users to get user name on review
//2. add to card function
//3. hover or click small images and show in the big image container

class ProductDetail extends Component {
  constructor() {
    super()
    this.averageReview = this.averageReview.bind()
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.readProduct(id)
  }

  averageReview(reviews) {
    if (reviews.length === 1) {
      return reviews[0].rating
    } else {
      return (
        reviews.reduce((accum, cur) => accum + cur.rating, 0) / reviews.length
      )
    }
  }

  render() {
    const {averageReview} = this
    const {cart, updateCart, addToCart} = this.props
    if (Object.keys(this.props.product).length === 0) {
      return <h1>loading...</h1>
    } else {
      let product = this.props.product
      const reviewAvg = averageReview(product.reviews)
        ? averageReview(product.reviews).toFixed(1)
        : 'First to Review'
      let bigImageUrl = product.images.find(
        image => image.url[image.url.length - 5] === '1'
      )
      if (!bigImageUrl) {
        bigImageUrl = {url: 'https://picsum.photos/250'}
      }
      bigImageUrl = bigImageUrl.url

      return (
        <div className="pageContainer">
          <div className="productDetailContainer">
            <div className="leftSection">
              <div className="imgListContainer">
                {product.images.map((image, id) => {
                  return (
                    <img
                      src={image.url ? image.url : 'https://picsum.photos/160'}
                      alt={product.name}
                      key={id}
                    />
                  )
                })}
              </div>
              <div className="bigImgContainer">
                <img
                  className="prodDetailBigImg"
                  src={bigImageUrl}
                  alt={product.name}
                />
                <div
                  className={
                    product.bestSeller
                      ? 'bestSellerInDetail bestSellerShow'
                      : 'bestSellerInDetail bestSellerNotShow'
                  }
                >
                  Best Seller
                </div>
              </div>
            </div>
            <div className="rightSection">
              <div className="detailItem detailTop">
                <div className="detailNameUnit">
                  {product.name} {product.unit}
                </div>
                {product.brand ? (
                  <div className="detailBrand">by {product.brand.name}</div>
                ) : null}
              </div>
              <div className="detailItem reviewStarBox">
                <ReviewStars rating={reviewAvg} />
                <div className="detailReview">{reviewAvg} out of 5</div>
              </div>
              <div className="detailItem detailPrice">${product.price}</div>
              <div className="detailItem detailDescrip">
                <ul>
                  {product.description
                    .split(';')
                    .map((item, id) => <li key={id}>{item}</li>)}
                </ul>
              </div>
              <div className="detailButtom">
                <button
                  className="addToCartBtnDetail"
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
                <Link to="/products" className="backToShopBtn">
                  Back to Shop
                </Link>
              </div>
            </div>
          </div>
          <div className="reviewContainer">
            <ul className="reviewList">
              <li className="reviewBoxTitle">Customer Reviews</li>
              {product.reviews.map((review, id) => (
                <li className="listRow" key={id}>
                  <div className="reviewRow1">
                    Customer {review.userId}'s Review: &nbsp;
                    <ReviewStars rating={review.rating} />
                  </div>
                  {/* TODO: need to update user model before we use names */}
                  <div>{review.description}</div>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = ({product, cart}) => ({
  product,
  cart
})

const mapDispatchToProps = dispatch => {
  return {
    readProduct: id => dispatch(readProduct(id)),
    addToCart: (product, userOrderId) =>
      dispatch(addItem(product, userOrderId)),
    updateCart: (orderId, quantity, cartId) =>
      dispatch(updateItem(orderId, quantity, cartId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
