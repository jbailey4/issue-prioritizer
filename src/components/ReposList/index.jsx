import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addRepos } from '../../store/repos/actions'
import { fetchRepos } from '../../api'

import styles from './reposlist.module.scss'

const ReposList = ({ didSelectRepo = () => {} }) => {
  const userRepos = useSelector((state) => state.repos)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  React.useEffect(() => {
    const getRepos = async () => {
      const userRepos = await fetchRepos(user.apiKey)
      dispatch(addRepos(userRepos))
    }

    getRepos()
  }, [user.apiKey])

  const handleRepoSelection = (e) => {
    didSelectRepo(Number(e.target.value))
  }

  return (
    <div className={styles.repoListContent}>
      <div className={styles.repoListTitle}>
        Repos ({userRepos && userRepos.length})
      </div>
      <form>
        {userRepos.length > 0 ? (
          userRepos.map((repo) => {
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
          })
        ) : (
          <p>No Repos for user</p>
        )}
      </form>
    </div>
  )
}

export default ReposList
