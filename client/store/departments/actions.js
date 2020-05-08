import axios from 'axios'
import {
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  READ_DEPARTMENT,
  READ_DEPARTMENTS,
  UPDATE_DEPARTMENT
} from './action_types'

const _createDepartment = department => {
  return {
    type: CREATE_DEPARTMENT,
    department
  }
}

const _deleteDepartment = department => {
  return {
    type: DELETE_DEPARTMENT,
    department
  }
}

const _readDepartment = department => {
  return {
    type: READ_DEPARTMENT,
    department
  }
}

const _readDepartments = departments => {
  return {
    type: READ_DEPARTMENTS,
    departments
  }
}

const _updateDepartment = department => {
  return {
    type: UPDATE_DEPARTMENT,
    department
  }
}

const createDepartment = department => {
  return async dispatch => {
    const createdDepartment = (await axios.post('/api/departments', department))
      .data
    dispatch(_createDepartment(createdDepartment))
  }
}

const deleteDepartment = id => {
  return async dispatch => {
    await axios.delete(`/api/departments/${id}`)
    dispatch(_deleteDepartment(id))
  }
}

const readDepartment = id => {
  return async dispatch => {
    const _department = (await axios.get(`/api/departments/${id}`)).data
    dispatch(_readDepartment(_department))
  }
}

const readDepartments = () => {
  return async dispatch => {
    const departments = (await axios.get('/api/departments')).data
    dispatch(_readDepartments(departments))
  }
}

const updateDepartment = (department, id) => {
  return async dispatch => {
    const updatedDepartment = (await axios.put(
      `/api/departments/${id}`,
      department
    )).data
    dispatch(_updateDepartment(updatedDepartment))
  }
}

export {
  createDepartment,
  deleteDepartment,
  readDepartment,
  readDepartments,
  updateDepartment
}
