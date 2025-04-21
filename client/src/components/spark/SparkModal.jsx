import React from 'react'
import styles from './SparkModal.module.css'
import { X } from 'lucide-react'

const SparkModal = ({ spark, onClose }) => {
  if (!spark) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
      <button onClick={onClose} className={styles.close}>
  ×
</button>
        <h2>{spark.title}</h2>
        <p><strong>Tag:</strong> {spark.tag || 'General'}</p>
        <p><strong>Urgency:</strong> {spark.urgency}</p>
        <p><strong>Reward:</strong> {spark.reward || 0} Sparks</p>
        <p style={{ marginTop: '20px' }}>{spark.description}</p>
      </div>
    </div>
  )
}

export default SparkModal
