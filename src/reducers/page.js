import {
  GET_PHOTO_REQUEST,
  GET_PHOTO_SUCCESS,
  GET_PHOTO_FAIL,
} from '../actions/PageActions'

const initialState = {
  year: 2018,
  photos: [],
  isFetching: false,
  error: '',
}

export function pageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PHOTO_REQUEST: {
      return { ...state, year: action.payload, isFetching: true, error: '' }
    }

    case GET_PHOTO_SUCCESS:
      return { ...state, photos: action.payload, isFetching: false, error: '' }

    case GET_PHOTO_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
      }

    default:
      return state
  }
}
