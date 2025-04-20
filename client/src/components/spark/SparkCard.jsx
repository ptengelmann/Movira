import React from 'react'
import styles from './SparkCard.module.css'
import { BadgeDollarSign, AlarmClock, Trash2 } from 'lucide-react'
import ReplyForm from './ReplyForm'
import useUserStore from '../../store/useUserStore'
import axios from 'axios'

const SparkCard = ({ spark, onDelete }) => {
  const { user } = useUserStore()
  const [replies, setReplies] = React.useState(spark.replies || [])

  const handleDeleteReply = async (index) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/sparks/${spark._id}/reply/${index}`, {
        data: { userId: user._id },
      })
      if (res.data.success) {
        setReplies(res.data.replies)
      }
    } catch (err) {
      console.error('Delete reply error:', err)
    }
  }

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
              <li
                key={i}
                style={{
                  fontSize: '14px',
                  marginBottom: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>
                  <strong>{r.username || 'Someone'}:</strong> {r.message}
                </span>
                {r.userId === user?._id && (
                  <button
                    onClick={() => handleDeleteReply(i)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'red',
                      fontSize: '12px',
                      cursor: 'pointer',
                      marginLeft: '12px',
                    }}
                  >
                    delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <ReplyForm
        sparkId={spark._id}
        onReplySubmit={(updatedReplies) => setReplies(updatedReplies)}
      />
    </div>
  )
}

export default SparkCard
