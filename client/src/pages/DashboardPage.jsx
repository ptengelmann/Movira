import React from 'react'
import useUserStore from '../store/useUserStore'
import styles from './DashboardPage.module.css'

const DashboardPage = () => {
  const { user } = useUserStore()

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>Welcome back, {user?.name} 👋</h1>
        <p>You currently have <strong>{user?.xp || 0}</strong> XP.</p>
        <p>This is your personal dashboard. Here you’ll be able to track your Sparks, responses, and progress.</p>
      </div>
    </div>
  )
}

export default DashboardPage
