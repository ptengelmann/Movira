import React from 'react'
import styles from './SparkCard.module.css'
import { BadgeDollarSign, AlarmClock, Trash2, Zap } from 'lucide-react'
import ApplicationForm from './ApplicationForm'
import useUserStore from '../../store/useUserStore'
import axios from 'axios'

const SparkCard = ({ spark, onDelete }) => {
  const { user } = useUserStore()
  const [applications, setApplications] = React.useState(spark.applications || [])

  const handleDeleteApplication = async (index) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/sparks/${spark._id}/application/${index}`, {
        data: { userId: user._id },
      })
      if (res.data.success) {
        setApplications(res.data.applications)
      }
    } catch (err) {
      console.error('Delete application error:', err)
    }
  }

  return (
    <div className={`${styles.card} ${spark.xpBoost ? styles.boosted : ''}`}>
      <div className={styles.badgeBar}>
        {spark.xpBoost && (
          <span className={styles.boostTag}>
            <Zap size={14} />
            Boosted
          </span>
        )}
        <span className={styles.tag}>{spark.tag || 'General'}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{spark.title}</h3>
        <p className={styles.description}>{spark.description}</p>

        <div className={styles.meta}>
          <span>
            <AlarmClock size={14} /> {spark.urgency}
          </span>
          {spark.reward > 0 && (
            <span>
              <BadgeDollarSign size={14} /> {spark.reward} Sparks
            </span>
          )}
        </div>
      </div>

      {onDelete && (
        <button className={styles.deleteBtn} onClick={() => onDelete(spark._id)}>
          <Trash2 size={16} /> Delete
        </button>
      )}

      {applications.length > 0 && user?.role === 'dropper' && (
        <div className={styles.applications}>
          <strong>Applications</strong>
          <ul>
            {applications.map((a, i) => (
              <li key={i}>
                <span><strong>{a.username || 'Someone'}:</strong> {a.message}</span>
                {a.userId === user?._id && (
                  <button onClick={() => handleDeleteApplication(i)} className={styles.deleteReply}>
                    delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ Only show ApplicationForm if responder */}
      {user?.role === 'responder' && (
        <ApplicationForm
          sparkId={spark._id}
          onApplicationSubmit={(updated) => setApplications(updated)}
        />
      )}
    </div>
  )
}

export default SparkCard
