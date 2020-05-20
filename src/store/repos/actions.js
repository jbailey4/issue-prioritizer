import * as api from '../../api'

export const FETCH_REPOS = 'FETCH_REPOS'
export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS'
export const FETCH_REPOS_ERROR = 'FETCH_REPOS_ERROR'

export const requestRepos = () => ({
  type: FETCH_REPOS,
})

export const requestReposSuccess = (repos) => ({
  type: FETCH_REPOS_SUCCESS,
  payload: {
    repos,
  },
})

export const fetchRepos = () => {
  return async (dispatch, getState) => {
    const { user } = getState()
    dispatch(requestRepos())

    // TODO - handle if there isn't an api key
    const repos = await api.fetchRepos(user.apiKey)

    dispatch(requestReposSuccess(repos))
  }
}
