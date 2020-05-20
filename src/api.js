export const fetchWithAuthorization = (url, apiKey) => {
  return fetch(url, {
    headers: new Headers({
      Authorization: `Basic ${btoa(apiKey)}`,
    }),
  })
}

export const fetchIssues = async (issueUrl, apiKey) => {
  const issuesResponse = await fetchWithAuthorization(
    `${issueUrl.replace('{/number}', '')}`,
    apiKey
  )

  if (issuesResponse.ok) {
    const issues = await issuesResponse.json()
    return issues.map(({ id, title, user, created_at, updated_at }) => {
      const { avatar_url, login } = user
      return { id, title, user: { avatar_url, login }, created_at, updated_at }
    })
  }
}

export const fetchRepos = async (apiKey) => {
  const reposResponse = await fetchWithAuthorization(
    'https://api.github.com/user/repos',
    apiKey
  )

  if (reposResponse.ok) {
    const userRepos = await reposResponse.json()
    return userRepos
  }
}
