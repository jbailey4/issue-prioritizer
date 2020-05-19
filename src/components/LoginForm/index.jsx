import * as React from 'react'

const LoginForm = ({ didLogin }) => {
  const [apiKey, setApiKey] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (apiKey !== '') {
      didLogin(apiKey)
      setApiKey('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="api-key">Enter Github API Key:</label>
      <input
        type="text"
        id="api-key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
    </form>
  )
}

export default LoginForm
