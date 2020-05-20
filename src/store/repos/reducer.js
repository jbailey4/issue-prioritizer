/*
  State tree for repos:

  {
    isLoading: boolean
    didInvalidate: boolean
    items: Repo[]
  }
*/

import * as actions from './actions'

const initialState = {
  isFetching: false,
  didInvalidate: false,
  error: null,
  items: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_REPOS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    case actions.FETCH_REPOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        error: null,
        items: [...action.payload.repos],
      }
    case actions.FETCH_REPOS_ERROR:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export default reducer
