import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const ProductCard = () => {
  const product = {
    id: 1,
    name: 'N95 Mask',
    unit: '2 PC',
    description:
      'Medical Grade; Comfortable and Excellent Against Harmful Air Particle.',
    price: 15,
    //imageURL: 'https://picsum.photos/250',
    //imageURL: '../../public/assets/n95_1.jpg',
    imageURL: 'assets/n95_1.jpg',
    inventoryQTY: 100,
    bestSeller: true,
    createdAt: '2020-05-02T21:38:39.869Z',
    updatedAt: '2020-05-02T21:38:39.869Z',
    departmentId: 2,
    brandId: 1
  }

  const brand = {
    id: 1,
    name: '4M'
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
        <img src="https://picsum.photos/600" alt={product.name} />
      </div>
      <Link to={'/products/' + product.id} className="cardItem productNameUnit">
        {product.name} {product.unit}
      </Link>
      {/* <div className="cardItem producUnit">{product.unit}</div> */}
      <div className="cardItem productBrand">by {brand.name}</div>
      <div className="cardItem productPrice">${product.price}</div>
      <button className="addToCartBtn">Add to Cart</button>
    </div>
  )
}

export default ProductCard

{
  /* <React.Fragment>
        <Card border="warning" style={{width: '50rem'}} text="dark">
        {product.bestSeller ? (
          <Card.Header text="danger">Best Seller</Card.Header>
        ) : (
          <Card.Header></Card.Header>
        )}
        <Card.Img variant="top" src="https://picsum.photos/250" />
        <Card.Body>
          <Card.Title>
            {product.name} {product.unit}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            by {brand.name}
          </Card.Subtitle>
          <Card.Text>${product.price}</Card.Text>
          <Button variant="success">Add to Cart</Button>
        </Card.Body>
      </Card>
      <br />
</React.Fragment> */
}