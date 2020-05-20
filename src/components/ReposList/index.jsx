import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRepos } from '../../store/repos/actions'

import styles from './repos-list.module.scss'

const getStyles = (isLoading = false) => {
  return [styles.repoListContent, isLoading ? styles.loading : ''].join(' ')
}

/*
  Lists the Repos for the currently logged in user.

  The `didSelectRepo` prop action will be called each
  time a repo selection is made.
 */
const ReposList = ({ didSelectRepo = () => {} }) => {
  const userRepos = useSelector((state) => state.repos.items)
  const reposLoading = useSelector((state) => state.repos.isFetching)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchRepos())
  }, [dispatch])

  const handleRepoSelection = (e) => {
    didSelectRepo(Number(e.target.value))
  }

  return (
    <div className={getStyles(reposLoading)}>
      <div className={styles.repoListTitle}>
        Repos ({userRepos && userRepos.length})
      </div>
      {reposLoading ? (
        <p>Loading...</p>
      ) : (
        <form>
          {userRepos.map((repo) => {
            return (
              <div key={repo.id} className={styles.repoListItem}>
                <input
                  type="radio"
                  name="repo-selection"
                  id={repo.id}
                  value={repo.id}
                  onChange={handleRepoSelection}
                />
                <label htmlFor={repo.id} className={styles.repoListItemLabel}>
                  <code>{repo.name}</code>
                </label>
              </div>
            )
          })}
        </form>
      )}
    </div>
  )
}

export default ReposList
