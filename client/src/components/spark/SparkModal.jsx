import React from 'react'
import styles from './SparkModal.module.css'

const SparkModal = ({ spark, onClose }) => {
  if (!spark) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.close}>×</button>

        <h2 className={styles.title}>{spark.title}</h2>

        <div className={styles.metaGroup}>
          <p><span className={styles.label}>Tag:</span> {spark.tag || 'General'}</p>
          <p><span className={styles.label}>Urgency:</span> {spark.urgency}</p>
          <p><span className={styles.label}>Reward:</span> {spark.reward || 0} Sparks</p>
        </div>

        <div className={styles.description}>
          {spark.description || 'No description provided.'}
        </div>
      </div>
    </div>
  )
}

export default SparkModal
