import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { loginAction } from './store/user/actions'

import LoginForm from './components/LoginForm'
import ReposList from './components/ReposList'
import './App.scss'

function App() {
  const user = useSelector((state) => state.user, shallowEqual)
  const dispatch = useDispatch()

  const handleSubmit = async (apiKey) => {
    dispatch(loginAction(apiKey))
  }

  return (
    <React.Fragment>
      {user.apiKey ? (
        <ReposList />
      ) : (
        <div className="App">
          <LoginForm didLogin={handleSubmit} />
        </div>
      )}
    </React.Fragment>
  )
}

export default App
