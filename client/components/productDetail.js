import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const ProductDetail = () => {
  const product = {
    id: 1,
    name: 'N95 Mask',
    unit: '2 PC',
    description:
      'Medical Grade; Comfortable and Excellent Against Harmful Air Particle.',
    price: 15,
    imageURL: 'assets/n95_1_use.jpg',
    inventoryQTY: 100,
    bestSeller: true,
    createdAt: '2020-05-05T19:41:25.559Z',
    updatedAt: '2020-05-05T19:41:25.559Z',
    departmentId: 1,
    brandId: 1,
    reviewAvg: '3.5000000000000000',
    brand: {
      name: '4M'
    }
  }

  let review = ''
  if (!product.reviewAvg) {
    review = 'First To Review'
  } else {
    review = parseFloat(product.reviewAvg).toFixed(1)
  }

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
          <img className="prodDetailBigImg" src="https://picsum.photos/640" />
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
          <div className="detailBrand">by {product.brand.name}</div>
        </div>
        <div className="detailItem detailReview">{review}</div>

        <div className="detailItem detailPrice">${product.price}</div>
        <div className="detailItem detailDescrip">{product.description}</div>
        <button className="addToCartBtnDetail detailBtn">Add to Cart</button>
        <button className="backToShopBtn detailBtn">
          <Link to="/products/">Back to Shop</Link>
        </button>
      </div>
    </div>
  )
}

export default ProductDetail

//   let review = ''
//   if (!product.reviewAvg) {
//     review = 'First To Review'
//   } else {
//     review = parseFloat(product.reviewAvg).toFixed(1)
//   }

//<h1>detial!</h1>
// <div className="productCardContainer">
//   <div className="imgContainer">
//     <div
//       className={
//         product.bestSeller
//           ? 'bestSeller bestSellerShow'
//           : 'bestSeller bestSellerNotShow'
//       }
//     >
//       Best Seller
//     </div>
//     <img src={product.imageURL} alt={product.name} />
//   </div>
//   <Link to={'/products/' + product.id} className="cardItem productNameUnit">
//     {product.name} {product.unit}
//   </Link>
//   <div className="cardItem productBrand">by {product.brand.name}</div>
//   <div className="cardItem productReview">{review}</div>
//   <div className="cardItem productPrice">${product.price}</div>
//   <button className="addToCartBtn">Add to Cart</button>
// </div>
