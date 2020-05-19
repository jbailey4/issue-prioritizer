import * as React from 'react'
import { useSelector } from 'react-redux'
import { fetchIssues } from '../../api'

const IssuesList = ({ repoId }) => {
  const repos = useSelector((state) => state.repos)
  const user = useSelector((state) => state.user)
  const [issues, setIssues] = React.useState([])

  React.useEffect(() => {
    const repo =
      repos.find(({ id }) => {
        return id === repoId
      }) || {}
    const issueUrl = repo.issues_url || ''

    const getIssues = async () => {
      const issues = await fetchIssues(issueUrl, user.apiKey)

      setIssues(issues)
    }

    repo && getIssues()
  }, [repoId])

  return (
    <React.Fragment>
      {issues && issues.length > 0 ? (
        issues.map((issue) => {
          return <p>{issue.title}</p>
        })
      ) : (
        <p>No Issues for this Repo</p>
      )}
    </React.Fragment>
  )
}

export default IssuesList
