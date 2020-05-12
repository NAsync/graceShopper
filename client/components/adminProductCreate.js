import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {createProduct} from '../store/products/actions'

class AdminProductCreate extends Component {
  constructor() {
    super()
    this.state = {
      // TODO: Add a validator method that validates each of these inputs and their types and returns bool
      // If true, then pass product object to createProduct action, otherwise output error message to page
      // We can also add a clean method that cleans any data, or coerces an input to a specific type
      name: '',
      unit: '',
      description: '',
      price: '',
      inventoryQTY: '',
      bestSeller: '',
      brandId: '',
      departmentId: ''
    }
    this.create = this.create.bind(this)
  }
  create() {
    const {
      name,
      unit,
      description,
      price,
      inventoryQTY,
      bestSeller,
      brandId,
      departmentId
    } = this.state
    const product = {
      name,
      unit,
      description,
      price,
      inventoryQTY,
      bestSeller,
      brandId: 1,
      departmentId: 1
    }
    this.props.create(product)
  }
  render() {
    const {create} = this
    const {
      name,
      unit,
      description,
      price,
      inventoryQTY,
      bestSeller
    } = this.state
    return (
      <div>
        <Link to="/admin/products">Go back</Link>
        <form onSubmit={ev => ev.preventDefault()}>
          <input
            type="text"
            value={name}
            placeholder="name"
            onChange={ev => this.setState({name: ev.target.value})}
          />
          <input
            type="text"
            value={unit}
            placeholder="unit"
            onChange={ev => this.setState({unit: ev.target.value})}
          />
          <input
            type="text"
            value={description}
            placeholder="description"
            onChange={ev => this.setState({description: ev.target.value})}
          />
          <input
            type="text"
            value={price}
            placeholder="price"
            onChange={ev => this.setState({price: ev.target.value})}
          />
          <input
            type="text"
            value={inventoryQTY}
            placeholder="inventoryQTY"
            onChange={ev => this.setState({inventoryQTY: ev.target.value})}
          />
          <input
            type="text"
            value={bestSeller}
            placeholder="bestSeller"
            onChange={ev => this.setState({bestSeller: ev.target.value})}
          />
          <button onClick={() => create()}>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({brand, department}) => {
  return {
    brand,
    department
  }
}

const mapDispatchToProps = dispatch => {
  return {
    create: product => dispatch(createProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductCreate)
