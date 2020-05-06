import axios from 'axios'
import {
  CREATE_BRAND,
  DELETE_BRAND,
  READ_BRAND,
  READ_BRANDS,
  UPDATE_BRAND
} from './action_types'

const _createBrand = brand => {
  return {
    type: CREATE_BRAND,
    brand
  }
}

const _deleteBrand = brand => {
  return {
    type: DELETE_BRAND,
    brand
  }
}

const _readBrand = brand => {
  return {
    type: READ_BRAND,
    brand
  }
}

const _readBrands = brands => {
  return {
    type: READ_BRANDS,
    brands
  }
}

const _updateBrand = brand => {
  return {
    type: UPDATE_BRAND,
    brand
  }
}

const createBrand = brand => {
  return async dispatch => {
    const createdBrand = (await axios.post('/api/brands', brand)).data
    dispatch(_createBrand(createdBrand))
  }
}

const deleteBrand = id => {
  return async dispatch => {
    await axios.delete(`/api/Brands/${id}`)
    dispatch(_deleteBrand(id))
  }
}

const readBrand = id => {
  return async dispatch => {
    const _brand = (await axios.get(`/api/brands/${id}`)).data
    dispatch(_readBrand(_brand))
  }
}

const readBrands = () => {
  return async dispatch => {
    const brands = (await axios.get('/api/brands')).data
    dispatch(_readBrands(brands))
  }
}

const updateBrand = (brand, id) => {
  return async dispatch => {
    const updatedBrand = (await axios.put(`/api/brands/${id}`, brand)).data
    dispatch(_updateBrand(updatedBrand))
  }
}

export {createBrand, deleteBrand, readBrand, readBrands, updateBrand}
