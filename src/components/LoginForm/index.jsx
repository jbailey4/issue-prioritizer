import * as React from 'react'
import styles from './login-form.module.scss'

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
    <div className={styles.loginFormContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <label className={styles.loginFormLabel} htmlFor="api-key">
          Enter Github API Key
        </label>
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
