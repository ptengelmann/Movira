import React from 'react'
import styles from './SparkCard.module.css'
import { BadgeDollarSign, AlarmClock, Trash2 } from 'lucide-react'
import ReplyForm from './ReplyForm'

const SparkCard = ({ spark, onDelete }) => {
  // Local update to trigger re-render when new replies are added
  const [replies, setReplies] = React.useState(spark.replies || [])

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

      {/* Delete button */}
      {onDelete && (
        <button className={styles.deleteBtn} onClick={() => onDelete(spark._id)}>
          <Trash2 size={16} /> Delete
        </button>
      )}

      {/* Replies */}
      {replies.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <strong>Replies:</strong>
          <ul style={{ marginTop: '8px' }}>
            {replies.map((r, i) => (
              <li key={i} style={{ fontSize: '14px', marginBottom: '6px' }}>
                <strong>{r.username || 'Someone'}:</strong> {r.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Reply Form */}
      <ReplyForm
        sparkId={spark._id}
        onReplySubmit={(updatedReplies) => setReplies(updatedReplies)}
      />
    </div>
  )
}

export default SparkCard
