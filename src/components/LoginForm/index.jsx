import * as React from 'react'
import styles from './login-form.module.scss'

/*
  Provides a small form to allow a user to login in via
  a Github API Key.

  The `didLogin` prop action will be called once a valid
  api key is submitted.
 */
const LoginForm = ({ didLogin }) => {
  const [apiKey, setApiKey] = React.useState('')
  const [error, setError] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (apiKey !== '') {
      didLogin(apiKey)
      setApiKey('')
    } else {
      setError('Please enter a valid Github API Key.')
    }
  }

  return (
    <div className={styles.loginFormContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <label className={styles.loginFormLabel} htmlFor="api-key">
          Enter Github API Key
        </label>
        <p className={styles.error}>{error}</p>
        <input
          className={styles.loginFormInput}
          type="text"
          id="api-key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <p>
          <em>Press enter key to submit</em>
        </p>
      </form>
    </div>
  )
}

export default LoginForm
