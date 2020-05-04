import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const ProductCard = ({product}) => {
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
