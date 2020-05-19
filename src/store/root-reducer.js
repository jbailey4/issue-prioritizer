import { combineReducers } from 'redux'

import issuesReducer from './issues/reducer'
import userReducer from './user/reducer'
import reposReducer from './repos/reducer'

const rootReducer = combineReducers({
  issues: issuesReducer,
  repos: reposReducer,
  user: userReducer,
})

export default rootReducer
