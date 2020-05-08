import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {readProduct} from '../store/products/actions'

class ProductDetail extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.readProduct(id)
  }

  render() {
    console.log('down here', this.props)
    if (!this.props.product) {
      return <h1>loading</h1>
    } else {
      let product = this.props.product
      return (
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
              {/* <div className="detailBrand">by {product.brand.name}</div> */}
            </div>
            {/* <div className="detailItem detailReview">{review}</div> */}

            <div className="detailItem detailPrice">${product.price}</div>
            <div className="detailItem detailDescrip">
              {product.description}
            </div>
            <button className="addToCartBtnDetail detailBtn">
              Add to Cart
            </button>
            <button className="backToShopBtn detailBtn">
              <Link to="/products">Back to Shop</Link>
            </button>
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

// const product = {
//   id: 1,
//   name: 'N95 Mask',
//   unit: '2 PC',
//   description:
//     'Medical Grade; Comfortable and Excellent Against Harmful Air Particle.',
//   price: 15,
//   imageURL: 'assets/n95_1_use.jpg',
//   inventoryQTY: 100,
//   bestSeller: true,
//   createdAt: '2020-05-05T19:41:25.559Z',
//   updatedAt: '2020-05-05T19:41:25.559Z',
//   departmentId: 1,
//   brandId: 1,
//   reviewAvg: '3.5000000000000000',
//   brand: {
//     name: '4M'
//   }
// }

// let review = ''
// if (!product.reviewAvg) {
//   review = 'First To Review'
// } else {
//   review = parseFloat(product.reviewAvg).toFixed(1)
// }
