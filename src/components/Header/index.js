import React from 'react'
import styles from './header.module.scss'

const AppHeader = () => {
  return (
    <header className={styles.appHeader}>
      <div className={styles.appHeaderContent}>
        <div className={styles.appHeaderLogo}>
          <img src="github-mark.png" alt="Github Logo" />
        </div>
        <div>
          <h1 className={styles.appHeaderTitle}>Issue Prioritizer</h1>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
