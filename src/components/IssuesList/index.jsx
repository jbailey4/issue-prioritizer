import * as React from 'react'
import { useSelector } from 'react-redux'
import { fetchIssues } from '../../api'

import styles from './issues-table.module.scss'

const IssuesList = ({ repoId }) => {
  const repos = useSelector((state) => state.repos)
  const user = useSelector((state) => state.user)
  const [issues, setIssues] = React.useState([])
  const [repo, setRepo] = React.useState('')

  React.useEffect(() => {
    const repo =
      repos.find(({ id }) => {
        return id === repoId
      }) || {}
    const issueUrl = repo.issues_url || ''

    const getIssues = async () => {
      const issues = await fetchIssues(issueUrl, user.apiKey)

      setIssues(issues)
      setRepo(repo)
    }

    repo && getIssues()
  }, [repoId])

  return (
    <React.Fragment>
      {issues && issues.length > 0 ? (
        <table className={styles.table}>
          <caption>
            Issues for <code>{repo.full_name}</code>
          </caption>
          <thead>
            <tr>
              <th>Avator</th>
              <th>Title</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {issues.map(({ id, title, user, created_at, updated_at }) => {
              return (
                <tr key={id}>
                  <td>
                    <img
                      src={user.avatar_url}
                      alt={`Avator for Github user ${user.login}`}
                      width="40"
                      height="40"
                    />
                  </td>
                  <td>{title}</td>
                  <td>{created_at}</td>
                  <td>{updated_at}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <p>
          <span role="img" aria-label="Thumbs up emoji">
            👍
          </span>{' '}
          No Issues for <code>{repo.full_name}</code>
        </p>
      )}
    </React.Fragment>
  )
}

export default IssuesList
