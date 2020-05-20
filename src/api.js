export const fetchIssues = async (issueUrl, apiKey) => {
  const issuesResponse = await fetch(`${issueUrl.replace('{/number}', '')}`, {
    headers: new Headers({
      Authorization: `Basic ${btoa(apiKey)}`,
    }),
  })

  if (issuesResponse.ok) {
    const issues = await issuesResponse.json()
    return issues.map(({ id, title, user, created_at, updated_at }) => {
      const { avatar_url, login } = user
      return { id, title, user: { avatar_url, login }, created_at, updated_at }
    })
  }
}

export const fetchRepos = async (apiKey) => {
  const reposResponse = await fetch('https://api.github.com/user/repos', {
    headers: new Headers({
      Authorization: `Basic ${btoa(apiKey)}`,
    }),
  })

  if (reposResponse.ok) {
    const userRepos = await reposResponse.json()
    return userRepos
  }
}
