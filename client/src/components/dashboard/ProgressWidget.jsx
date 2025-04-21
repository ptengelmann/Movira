import React from 'react'
import styles from './ProgressWidget.module.css'

const getLevelFromXP = (xp) => {
  if (xp >= 100) return { label: 'Verified', next: null }
  if (xp >= 50) return { label: 'Trusted', next: 100 }
  if (xp >= 20) return { label: 'Rising', next: 50 }
  return { label: 'New', next: 20 }
}

const ProgressWidget = ({ currentXP }) => {
  const { label, next } = getLevelFromXP(currentXP)
  const progressPercent = next ? (currentXP / next) * 100 : 100
  const xpToNext = next ? next - currentXP : 0

  return (
    <div className={styles.progressBox}>
      <p className={styles.title}>
        Progress to <span className={styles.level}>{label}</span>
      </p>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${progressPercent}%` }} />
      </div>
      {next && (
        <p className={styles.xpInfo}>
          <strong>{currentXP} XP</strong> • <span>{xpToNext} XP to next level</span>
        </p>
      )}
    </div>
  )
}

export default ProgressWidget
