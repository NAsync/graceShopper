import React, {Component} from 'react'
import {Link} from 'react-router-dom'
//import {CardColumns, Card, Image, Row, Col, Container, Button} from 'react-bootstrap'
import ProductCard from './productCard'

const Products = () => {
  return (
    <div id="productsContainer">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  )
}

export default Products
