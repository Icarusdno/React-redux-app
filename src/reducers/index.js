import { userReducer } from './user'
import { pageReducer } from './page'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  page: pageReducer,
  user: userReducer,
})
