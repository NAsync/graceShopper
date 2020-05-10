import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Dropdown} from 'react-bootstrap'

const SideNavbar = ({brands, departments}) => (
  <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown">
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <div id="side-nav-container">
        <ul id="brands-nav">
          <h2>Shop by Brands</h2>
          {brands.map(brand => (
            <li key={brand.id}>
              <Link to={`/brand/${brand.id}`}>{brand.name}</Link>
            </li>
          ))}
        </ul>
        <ul id="departments-nav">
          <h2>Shop by Departments</h2>
          {departments.map(department => (
            <li key={department.id}>
              <Link to={`/department/${department.id}`}>{department.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Dropdown.Menu>
  </Dropdown>
)

const mapState = ({brands, departments}) => {
  return {
    brands,
    departments
  }
}

export default connect(mapState)(SideNavbar)
