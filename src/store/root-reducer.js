import { combineReducers } from 'redux'

import userReducer from './user/reducer'
import reposReducer from './repos/reducer'

const rootReducer = combineReducers({
  repos: reposReducer,
  user: userReducer,
})

export default rootReducer
