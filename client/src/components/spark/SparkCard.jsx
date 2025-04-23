import React from 'react'
import styles from './SparkCard.module.css'
import { BadgeDollarSign, AlarmClock, Trash2, Zap } from 'lucide-react'
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
    <div className={`${styles.card} ${spark.xpBoost ? styles.boostedCard : ''}`}>
      <div className={styles.header}>
        <div className={styles.topRow}>
          <h3 className={styles.title}>{spark.title}</h3>
          {spark.xpBoost && (
            <div className={styles.boostBadge}>
              <Zap size={14} />
              <span>Boosted</span>
            </div>
          )}
        </div>

        <p className={styles.description}>{spark.description}</p>

        <div className={styles.metaRow}>
          <span className={styles.tag}>{spark.tag || 'General'}</span>
          <span className={styles.meta}>
            <AlarmClock size={14} />
            {spark.urgency}
          </span>
          {spark.reward > 0 && (
            <span className={styles.reward}>
              <BadgeDollarSign size={14} />
              {spark.reward} Sparks
            </span>
          )}
        </div>
      </div>

      {onDelete && (
        <button className={styles.deleteBtn} onClick={() => onDelete(spark._id)}>
          <Trash2 size={16} /> Delete
        </button>
      )}

      {replies.length > 0 && (
        <div className={styles.replies}>
          <strong>Replies</strong>
          <ul>
            {replies.map((r, i) => (
              <li key={i} className={styles.reply}>
                <span><strong>{r.username || 'Someone'}:</strong> {r.message}</span>
                {r.userId === user?._id && (
                  <button onClick={() => handleDeleteReply(i)} className={styles.deleteReply}>
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
