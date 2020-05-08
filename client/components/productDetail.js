import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {readProduct} from '../store/products/actions'

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
    console.log('prop', this.props)
    if (Object.keys(this.props.product).length === 0) {
      return <h1>loading...</h1>
    } else {
      let product = this.props.product
      console.log('prod', product)
      const reviewAvg = averageReview(product.reviews)
        ? averageReview(product.reviews).toFixed(1)
        : 'First to Review'

      return (
        <div className="pageContainer">
          <div className="productDetailContainer">
            <div className="leftSection">
              <div className="imgListContainer">
                <img src="https://picsum.photos/160" />
                <img src="https://picsum.photos/160" />
                <img src="https://picsum.photos/160" />
                <img src="https://picsum.photos/160" />
              </div>
              <div className="bigImgContainer">
                <img
                  className="prodDetailBigImg"
                  src="https://picsum.photos/640"
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
              <div className="detailItem detailReview">{reviewAvg}</div>
              <div className="detailItem detailPrice">${product.price}</div>
              <div className="detailItem detailDescrip">
                {product.description}
              </div>
              <div className="detailButtom">
                <button className="addToCartBtnDetail">Add to Cart</button>
                <Link to="/products" className="backToShopBtn">
                  <button className="btnInLink">Back to Shop</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="reviewContainer">
            <ul className="reviewList">
              {product.reviews.map(review => (
                <li className="listRow">
                  <span className="listItem">{review.rating}</span>
                  <span className="listItem">{review.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = ({product}) => ({
  product
})

const mapDispatchToProps = dispatch => {
  return {
    readProduct: id => dispatch(readProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
