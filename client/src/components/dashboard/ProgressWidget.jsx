import React from 'react'
import styles from './ProgressWidget.module.css'

const ProgressWidget = ({ currentXP }) => {
  // XP milestones
  const levels = [
    { level: 'New', xp: 0 },
    { level: 'Rising', xp: 20 },
    { level: 'Trusted', xp: 50 },
    { level: 'Verified', xp: 100 },
  ]

  // Find current and next level
  const currentLevel = levels.findLast(l => currentXP >= l.xp) || levels[0]
  const nextLevel = levels.find(l => l.xp > currentXP)

  const xpNeeded = nextLevel ? nextLevel.xp - currentXP : 0
  const progress = nextLevel
    ? ((currentXP - currentLevel.xp) / (nextLevel.xp - currentLevel.xp)) * 100
    : 100

  return (
    <div className={styles.wrapper}>
      <h4>Progress to <span>{nextLevel ? nextLevel.level : 'Max'}</span></h4>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${progress}%` }} />
      </div>
      <p>{currentXP} XP • {xpNeeded > 0 ? `${xpNeeded} XP to next level` : 'You’re at the top 🎯'}</p>
    </div>
  )
}

export default ProgressWidget
