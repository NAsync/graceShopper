import axios from 'axios'

//review action types

export const CREATE_REVIEW = 'CREATE_REVIEW'
export const READ_REVIEW = 'READ_REVIEW'
export const UPDATE_REVIEW = 'UPDATE_REVIEW'
export const DELETE_REVIEW = 'DELETE_REVIEW'
export const READ_REVIEWS = 'READ_REVIEWS'

//review actions

const _createReview = review => {
  return {
    type: CREATE_REVIEW,
    review
  }
}

const _deleteReview = review => {
  return {
    type: DELETE_REVIEW,
    review
  }
}

const _readReview = review => {
  return {
    type: READ_REVIEW,
    review
  }
}

const _readReviews = reviews => {
  return {
    type: READ_REVIEWS,
    reviews
  }
}

const _updateReview = review => {
  return {
    type: UPDATE_REVIEW,
    review
  }
}

//review thunk

const createReview = review => {
  return async dispatch => {
    const createdReview = (await axios.post('/api/reviews', review)).data
    dispatch(_createReview(createdReview))
  }
}

const deleteReview = review => {
  return async dispatch => {
    await axios.delete(`/api/reviews/${review.id}`)
    dispatch(_deleteReview(review))
  }
}

const readReview = review => {
  return async dispatch => {
    const _review = (await axios.get(`/api/reviews/${review.id}`)).data
    dispatch(_readReview(_review))
  }
}

const readReviews = () => {
  return async dispatch => {
    const reviews = (await axios.get('/api/reviews')).data
    dispatch(_readReviews(reviews))
  }
}

const updateReview = review => {
  return async dispatch => {
    const updatedReview = (await axios.put(`/api/reviews/${review.id}`, review))
      .data
    dispatch(_updateReview(updatedReview))
  }
}

export {createReview, deleteReview, readReview, readReviews, updateReview}

//review reducer

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW:
      return [...state, action.review]
    case DELETE_REVIEW:
      return state.filter(review => review.id !== action.review.id)
    case READ_REVIEW:
      return action.review
    case UPDATE_REVIEW:
      return state.map(
        review => (review.id === action.review.id ? action.review : review)
      )
    default:
      return state
  }
}

export const reviewsReducer = (state = [], action) => {
  switch (action.type) {
    case READ_REVIEWS:
      return action.reviews
    default:
      return state
  }
}
