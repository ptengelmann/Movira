import React from 'react'
import styles from './StatsWidget.module.css'

const StatsWidget = ({ label, value, icon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.info}>
        <h4>{label}</h4>
        <p>{value}</p>
      </div>
    </div>
  )
}

export default StatsWidget
