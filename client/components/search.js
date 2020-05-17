import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import productSearchStore from '../store/searchStore'

class Search extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      productList: []
    }
  }

  render() {
    const {text, productList} = this.state
    const {products} = this.props
    console.log(productList)
    return (
      <form onSubmit={ev => ev.preventDefault()}>
        <input
          type="text"
          onChange={ev => {
            this.setState({text: ev.target.value})
            const list = products.filter(product => {
              if (
                product.name.toLowerCase().includes(text.toLocaleLowerCase()) ||
                product.description
                  .toLowerCase()
                  .includes(text.toLocaleLowerCase())
              ) {
                return product
              }
            })
            list.length !== 0 && this.setState({productList: list})
          }}
          value={text}
        />
        <Link to="/search">
          <button
            onClick={() => {
              this.props.searchResults(productList)
            }}
          >
            search
          </button>
        </Link>
      </form>
    )
  }
}

const mapStateToProps = ({products}) => ({
  products
})

const mapDispatchToProps = dispatch => ({
  searchResults: productList => dispatch(productSearchStore(productList))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
