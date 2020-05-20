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
    </form>
  )
}

export default LoginForm
