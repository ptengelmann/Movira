import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './DashboardPage.module.css'
import { AlarmClock, BadgeDollarSign, Trash2, Zap } from 'lucide-react'
import useUserStore from '../store/useUserStore'

const ManageSparksPage = () => {
  const { user } = useUserStore()
  const [userSparks, setUserSparks] = useState([])

  useEffect(() => {
    const fetchSparks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/sparks/user/${user._id}`)
        if (res.data.success) setUserSparks(res.data.data)
      } catch (err) {
        console.error('Error fetching sparks:', err)
      }
    }

    if (user?.role === 'dropper') fetchSparks()
  }, [user])

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this Spark?')
    if (!confirm) return

    try {
      await axios.delete(`http://localhost:5000/api/sparks/${id}`)
      setUserSparks((prev) => prev.filter((s) => s._id !== id))
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>⚙️ Manage Your Sparks</h1>
        <p className={styles.description}>View, manage, and delete any Sparks you've dropped.</p>

        {userSparks.length > 0 ? (
          <div className={styles.sparkGrid}>
            {userSparks.map((spark) => (
              <div key={spark._id} className={`${styles.sparkCard} ${spark.xpBoost ? styles.boostedCard : ''}`}>
                <div className={styles.sparkTop}>
                  <h4>{spark.title}</h4>
                  {spark.xpBoost && (
                    <span className={styles.boostedLabel}>
                      <Zap size={14} />
                      Boosted
                    </span>
                  )}
                </div>
                <p className={styles.sparkDescription}>{spark.description}</p>
                <div className={styles.meta}>
                  <span><AlarmClock size={14} /> {spark.urgency}</span>
                  {spark.reward > 0 && (
                    <span><BadgeDollarSign size={14} /> {spark.reward} Sparks</span>
                  )}
                </div>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(spark._id)}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.emptyState}>You haven’t dropped any Sparks yet.</p>
        )}
      </div>
    </div>
  )
}

export default ManageSparksPage
