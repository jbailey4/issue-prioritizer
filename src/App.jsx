import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { loginAction } from './store/user/actions'

import LoginForm from './components/LoginForm'
import ReposList from './components/ReposList'
import IssuesTable from './components/IssuesTable'
import Header from './components/Header'
import styles from './App.module.scss'

function App() {
  const user = useSelector((state) => state.user, shallowEqual)
  const dispatch = useDispatch()

  const [selectedRepo, setSelectedRepo] = React.useState(null)

  const handleSubmit = async (apiKey) => {
    dispatch(loginAction(apiKey))
  }

  return (
    <React.Fragment>
      <Header />

      <main className={styles.mainContainer}>
        {user.apiKey ? (
          <div className={styles.splitScreen}>
            <aside className={styles.splitScreenRightPanel}>
              <ReposList didSelectRepo={setSelectedRepo} />
            </aside>
            <section className={styles.splitScreenLeftPanel}>
              {selectedRepo ? (
                <IssuesTable repoId={selectedRepo} />
              ) : (
                <p>
                  <span role="img" aria-label="Pointing left emoji">
                    👈
                  </span>{' '}
                  Please pick a repo.
                </p>
              )}
            </section>
          </div>
        ) : (
          <div>
            <LoginForm didLogin={handleSubmit} />
          </div>
        )}
      </main>
    </React.Fragment>
  )
}

export default App
