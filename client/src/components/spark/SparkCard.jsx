import React from 'react'
import styles from './SparkCard.module.css'
import { BadgeDollarSign } from 'lucide-react'

const SparkCard = ({ spark }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{spark.title}</h3>
        <span className={styles.tag}>{spark.tag}</span>
      </div>
      <p className={styles.description}>{spark.description}</p>
      <div className={styles.meta}>
        <span className={styles.time}>{spark.time}</span>
        {spark.reward && (
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
