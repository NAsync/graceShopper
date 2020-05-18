import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateProduct} from '../store/products/actions'

const nonEditableFields = [
  'brandId',
  'departmentId',
  'createdAt',
  'id',
  'updatedAt'
]

class AdminProductSingle extends Component {
  constructor({product}) {
    super()
    this.state = {
      name: product.name,
      unit: product.unit,
      description: product.description,
      price: product.price,
      inventoryQTY: product.inventoryQTY,
      bestSeller: product.bestSeller,
      brandId: product.brandId,
      departmentId: product.departmentId
    }
    this.update = this.update.bind(this)
  }
  update() {
    const {name, unit, description, price, brandId, departmentId} = this.state
    let {inventoryQTY, bestSeller} = this.state
    inventoryQTY = +inventoryQTY
    if (bestSeller === 'true') {
      bestSeller = true
    } else if (bestSeller === 'false') {
      bestSeller = false
    }
    let product = {
      name,
      unit,
      description,
      price,
      inventoryQTY,
      bestSeller,
      brandId,
      departmentId
    }
    product = this.updateDontReplace(product, this.props.product)
    this.props.update(product)
  }
  updateDontReplace(newObj, oldObj) {
    // this is a helper function that looks at the keys in both objects passed in
    // if the newObj does not contain a key in the oldObj, it adds that key/value pair
    // if the newObj already has that key, we don't replace its value
    Object.keys(oldObj).forEach(key => {
      if (!newObj[key]) {
        newObj[key] = oldObj[key]
      }
    })
    return newObj
  }
  render() {
    const {update} = this
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
    if (!this.state.name) return ''
    return (
      <div>
        <Link to="/admin/products">Admin Products</Link>
        {nonEditableFields.map(field => {
          return (
            <p key={field} className="admin-non-edit">
              {field}: {`${this.props.product[field]}`}
            </p>
          )
        })}
        <form onSubmit={ev => ev.preventDefault()}>
          <fieldset>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={ev => this.setState({name: ev.target.value})}
              />
            </div>
            <div>
              <label>Unit:</label>
              <input
                type="text"
                value={unit}
                onChange={ev => this.setState({unit: ev.target.value})}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={description}
                onChange={ev => this.setState({description: ev.target.value})}
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="text"
                value={price}
                onChange={ev => this.setState({price: ev.target.value})}
              />
            </div>
            <div>
              <label>Inventory:</label>
              <input
                type="text"
                value={inventoryQTY}
                onChange={ev => this.setState({inventoryQTY: ev.target.value})}
              />
            </div>
            <div>
              <label>Best Seller:</label>
              <input
                type="text"
                value={bestSeller}
                onChange={ev => this.setState({bestSeller: ev.target.value})}
              />
            </div>
          </fieldset>
          <button onClick={() => update()}>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({product}) => {
  return {
    product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: product => dispatch(updateProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductSingle)
