import { GET_PHOTO_REQUEST, GET_PHOTO_SUCCESS } from '../actions/PageActions'

const initialState = {
  year: 2018,
  photos: [],
  isFetching: false,
}

export function pageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PHOTO_REQUEST: {
      return { ...state, year: action.payload, isFetching: true }
    }

    case GET_PHOTO_SUCCESS:
      return { ...state, photos: action.payload, isFetching: false }

    default:
      return state
  }
}
