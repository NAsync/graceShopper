import {
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  READ_DEPARTMENT,
  READ_DEPARTMENTS,
  UPDATE_DEPARTMENT
} from './action_types'

export const departmentReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_DEPARTMENT:
      return [...state, action.department]
    case DELETE_DEPARTMENT:
      return state.filter(department => department.id !== action.department.id)
    case READ_DEPARTMENT:
      return action.department
    case UPDATE_DEPARTMENT:
      return state.map(
        department =>
          department.id === action.department.id
            ? action.department
            : department
      )
    default:
      return state
  }
}

export const departmentsReducer = (state = [], action) => {
  switch (action.type) {
    case READ_DEPARTMENTS:
      return action.departments
    default:
      return state
  }
}
