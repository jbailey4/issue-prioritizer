import * as React from 'react'
import { useSelector } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { fetchIssues } from '../../api'
import { getRelativeTime, getFormattedDate } from '../../utils'

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

    setRepo(repo)

    const getIssues = async () => {
      let issues

      const cachedOrderedIssues = sessionStorage.getItem(`${repoId}-issues`)
      if (cachedOrderedIssues) {
        issues = JSON.parse(cachedOrderedIssues)
      } else {
        issues = await fetchIssues(issueUrl, user.apiKey)
      }

      setIssues(issues)
    }

    repo && getIssues()
  }, [repoId, repos, user.apiKey])

  const handleDragEnd = (result) => {
    const { destination, source } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const reorderedIssues = Array.from(issues)
    const temp = reorderedIssues[source.index]
    reorderedIssues[source.index] = reorderedIssues[destination.index]
    reorderedIssues[destination.index] = temp

    sessionStorage.setItem(`${repoId}-issues`, JSON.stringify(reorderedIssues))

    setIssues(reorderedIssues)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
            <Droppable droppableId="droppable">
              {(droppableProvided) => (
                <tbody
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                >
                  {issues.map(
                    ({ id, title, user, created_at, updated_at }, index) => {
                      return (
                        <Draggable key={id} draggableId={`${id}`} index={index}>
                          {(provided) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <td>
                                <img
                                  src={user.avatar_url}
                                  alt={`Avator for Github user ${user.login}`}
                                  width="40"
                                  height="40"
                                />
                              </td>
                              <td>{title}</td>
                              <td>{getFormattedDate(created_at)}</td>
                              <td>{getRelativeTime(updated_at)}</td>
                            </tr>
                          )}
                        </Draggable>
                      )
                    }
                  )}
                  {droppableProvided.placeholder}
                </tbody>
              )}
            </Droppable>
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
    </DragDropContext>
  )
}

export default IssuesList
