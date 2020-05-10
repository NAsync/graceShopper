import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Carousel} from 'react-bootstrap'
import {connect} from 'react-redux'

const Departments_slide = ({departments}) => {
  if (departments.length === 0) {
    return <h1>loading</h1>
  }
  const healthDptId = departments.find(
    department => department.name === 'health'
  ).id
  const groceryDptId = departments.find(
    department => department.name === 'grocery'
  ).id

  return (
    <div className="carousel">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="assets/health_dept.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h1>Shop for Safe</h1>
            <Link to={`/department/${healthDptId}`} className="slideLink">
              <h3>Visit our health department</h3>
            </Link>
            <Link to="/products" className="slideLink">
              <h3>Visit All</h3>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="assets/grocery_dept.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h1>Shop for Life</h1>
            <Link to={`/department/${groceryDptId}`} className="slideLink">
              <h3>Visit our grocery department</h3>
            </Link>
            <Link to="/products" className="slideLink">
              <h3>Visit All</h3>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

const mapState = ({departments}) => {
  return {
    departments
  }
}

export default connect(mapState)(Departments_slide)
