import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import styles from './MyApplicationsPage.module.css'
import { ClipboardList, AlarmClock, BadgeDollarSign, Zap } from 'lucide-react'

const ApplicationsPage = () => {
  const { user } = useUserStore()
  const [sentApplications, setSentApplications] = useState([])
  const [receivedSparks, setReceivedSparks] = useState([])
  const [expanded, setExpanded] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sparks')
        if (res.data.success) {
          const all = res.data.data
          if (user.role === 'dropper') {
            const mine = all.filter(s => s.userId === String(user._id))
            setReceivedSparks(mine)
          } else {
            const mine = all
              .map(s => {
                const match = s.applications?.find(a => a.userId === String(user._id))
                return match ? { ...s, myApplication: match } : null
              })
              .filter(Boolean)
            setSentApplications(mine)
          }
        }
      } catch (err) {
        console.error('Fetching error:', err)
      }
    }
    fetchData()
  }, [user])

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1>
          {user.role === 'dropper' ? '📥 Your Spark Applications' : '📤 Your Applications'}
        </h1>
        <p className={styles.pageDescription}>
          {user.role === 'dropper'
            ? 'Here are the Sparks you’ve dropped and the applications received.'
            : 'These are the Sparks you’ve applied to with your proposals.'}
        </p>

        {/* DROPPER VIEW */}
        {user.role === 'dropper' && (
          <div className={styles.list}>
            {receivedSparks.length > 0 ? (
              receivedSparks.map((spark) => (
                <div key={spark._id} className={`${styles.sparkCardPreview} ${spark.xpBoost ? styles.boostedCard : ''}`}>
                  <div className={styles.sparkTopRow}>
                    <div className={styles.sparkTitle}>
                      <ClipboardList size={16} />
                      <strong>{spark.title}</strong>
                      {spark.xpBoost && (
                        <span className={styles.boostedTag}>
                          <Zap size={14} />
                          Boosted
                        </span>
                      )}
                    </div>
                    <p className={styles.sparkDescription}>{spark.description}</p>
                    <div className={styles.metaRow}>
                      <span><AlarmClock size={14} /> {spark.urgency}</span>
                      {spark.reward > 0 && (
                        <span><BadgeDollarSign size={14} /> {spark.reward} Sparks</span>
                      )}
                    </div>
                  </div>

                  <button
                    className={styles.toggleBtn}
                    onClick={() =>
                      setExpanded(prev => ({ ...prev, [spark._id]: !prev[spark._id] }))
                    }
                  >
                    {expanded[spark._id]
                      ? 'Hide Applications'
                      : `Show Applications (${spark.applications?.length || 0})`}
                  </button>

                  {expanded[spark._id] && (
                    <div className={styles.applicationsBox}>
                      {spark.applications?.length > 0 ? (
                        spark.applications.map((a, i) => (
                          <div key={i} className={styles.appEntry}>
                            <p><strong>{a.username}:</strong> {a.message}</p>
                            <span className={styles.timestamp}>
                              {new Date(a.createdAt).toLocaleString()}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p>No applications yet.</p>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className={styles.empty}>No applications received yet.</p>
            )}
          </div>
        )}

        {/* RESPONDER VIEW */}
        {user.role === 'responder' && (
          <div className={styles.list}>
            {sentApplications.length > 0 ? (
              sentApplications.map((spark) => (
                <div key={spark._id} className={styles.sentCard}>
                  <div className={styles.sentCardHeader}>
                    <ClipboardList size={16} />
                    <div>
                      <strong>{spark.title}</strong>
                      {spark.xpBoost && (
                        <span className={styles.boostedTag}>
                          <Zap size={14} />
                          Boosted
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.sentCardMeta}>
                    <span><AlarmClock size={14} /> {spark.urgency}</span>
                    <span><BadgeDollarSign size={14} /> {spark.reward} Sparks</span>
                  </div>
                  <p className={styles.sentCardDesc}>{spark.description}</p>
                  <div className={styles.sentCardFooter}>
                    <em>You applied: {spark.myApplication.message}</em>
                    <span className={styles.timestamp}>
                      {new Date(spark.myApplication.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.empty}>You haven’t applied to any Sparks yet.</p>
            )}
          </div>
        )}

        <Link to="/explore" className={styles.backLink}>
          ← Back to Explore
        </Link>
      </div>
    </div>
  )
}

export default ApplicationsPage
