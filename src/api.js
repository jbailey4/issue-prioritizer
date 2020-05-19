export const fetchIssues = async (issueUrl, apiKey) => {
  const issuesResponse = await fetch(`${issueUrl.replace('{/number}', '')}`, {
    headers: new Headers({
      Authorization: `Basic ${btoa(apiKey)}`,
    }),
  })

  if (issuesResponse.ok) {
    const issues = await issuesResponse.json()
    return issues
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
