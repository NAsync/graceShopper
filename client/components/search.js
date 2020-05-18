import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import productSearchStore from '../store/searchStore'

class Search extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      productList: [],
      inputFocus: false
    }
  }

  render() {
    const {text, productList, inputFocus} = this.state
    const {products} = this.props

    return (
      <form onSubmit={ev => ev.preventDefault()}>
        <input
          type="text"
          id="searchInput"
          onFocus={() => this.setState({inputFocus: true})} //tells react that form is selcted
          onBlur={() => this.setState({inputFocus: false})} //tells react form is not selected
          onChange={ev => {
            this.setState({text: ev.target.value})
            const list = filterProducts(products, text)
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
        {text.length && inputFocus ? (
          <ul id="searchOptions">
            {productList.map(item => (
              <li
                key={item.id}
                onMouseDown={() => {
                  this.setState({text: item.name})
                  const dropDownList = filterProducts(products, item.name)
                  dropDownList.length !== 0 &&
                    this.setState({productList: dropDownList})
                  this.props.searchResults(productList)
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        ) : (
          ''
        )}
      </form>
    )
  }
}

function filterProducts(products, text) {
  return products.filter(product => {
    if (
      product.name.toLowerCase().includes(text.toLocaleLowerCase()) ||
      product.description.toLowerCase().includes(text.toLocaleLowerCase())
    ) {
      return product
    }
  })
}

const mapStateToProps = ({products}) => ({
  products
})

const mapDispatchToProps = dispatch => ({
  searchResults: productList => dispatch(productSearchStore(productList))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
