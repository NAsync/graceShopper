import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Carousel} from 'react-bootstrap'

const Departments_slide = () => {
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
            <Link to="/departments/1" className="slideLink">
              <h3>Visit our health department</h3>
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
            <Link to="/departments/2" className="slideLink">
              <h3>Visit our grocery department</h3>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default Departments_slide
