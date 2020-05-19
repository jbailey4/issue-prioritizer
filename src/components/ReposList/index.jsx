import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import IssuesList from '../IssuesList'
import { addRepos } from '../../store/repos/actions'
import { fetchRepos } from '../../api'

const ReposList = () => {
  const userRepos = useSelector((state) => state.repos)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [selectedRepo, setSelectedRepo] = React.useState(null)

  React.useEffect(() => {
    const getRepos = async () => {
      const userRepos = await fetchRepos(user.apiKey)
      dispatch(addRepos(userRepos))
    }

    getRepos()
  }, [user.apiKey])

  const handleRepoSelection = (e) => {
    setSelectedRepo(Number(e.target.value))
  }

  return (
    <React.Fragment>
      <h1>{selectedRepo}</h1>
      <form>
        {userRepos.length > 0 ? (
          userRepos.map((repo) => {
            return (
              <div key={repo.id}>
                <input
                  type="radio"
                  name="repo-selection"
                  id={repo.id}
                  value={repo.id}
                  onChange={handleRepoSelection}
                />
                <label htmlFor={repo.id}>{repo.name}</label>
              </div>
            )
          })
        ) : (
          <p>No Repos for user</p>
        )}
      </form>

      <div>{selectedRepo && <IssuesList repoId={selectedRepo} />}</div>
    </React.Fragment>
  )
}

export default ReposList
