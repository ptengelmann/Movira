import React from 'react'
import styles from './AuthFormLayout.module.css'

const AuthFormLayout = ({ title, children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default AuthFormLayout
