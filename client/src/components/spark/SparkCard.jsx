import React from 'react'
import styles from './SparkCard.module.css'
import { BadgeDollarSign, AlarmClock } from 'lucide-react'

const SparkCard = ({ spark }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{spark.title}</h3>
        <span className={styles.tag}>{spark.tag || 'General'}</span>
      </div>

      <p className={styles.description}>{spark.description}</p>

      <div className={styles.meta}>
        <span className={styles.time}>
          <AlarmClock size={14} style={{ marginRight: '6px' }} />
          {spark.urgency || '1hr'}
        </span>
        {spark.reward > 0 && (
          <span className={styles.reward}>
            <BadgeDollarSign size={16} />
            {spark.reward} Sparks
          </span>
        )}
      </div>
    </div>
  )
}

export default SparkCard
