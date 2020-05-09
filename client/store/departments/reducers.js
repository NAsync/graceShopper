import {
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  READ_DEPARTMENT,
  READ_DEPARTMENTS,
  UPDATE_DEPARTMENT
} from './action_types'

export const departmentReducer = (state = {}, action) => {
  switch (action.type) {
    case READ_DEPARTMENT:
      return action.department
    default:
      return state
  }
}

export const departmentsReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_DEPARTMENT:
      return [...state, action.department]
    case READ_DEPARTMENTS:
      return action.departments
    case UPDATE_DEPARTMENT:
      return state.map(
        department =>
          department.id === action.department.id
            ? action.department
            : department
      )
    case DELETE_DEPARTMENT:
      return state.filter(department => department.id !== action.department.id)
    default:
      return state
  }
}
