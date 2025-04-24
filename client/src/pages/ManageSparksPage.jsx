import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useUserStore from '../store/useUserStore'
import styles from './ManageSparksPage.module.css'
import { Trash2, AlarmClock, BadgeDollarSign, Zap } from 'lucide-react'

const ManageSparksPage = () => {
  const { user } = useUserStore()
  const [sparks, setSparks] = useState([])

  useEffect(() => {
    const fetchSparks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/sparks/user/${user._id}`)
        if (res.data.success) {
          setSparks(res.data.data)
        }
      } catch (err) {
        console.error('Failed to fetch sparks:', err)
      }
    }

    if (user?.role === 'dropper') fetchSparks()
  }, [user])

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Spark?')
    if (!confirmDelete) return

    try {
      await axios.delete(`http://localhost:5000/api/sparks/${id}`)
      setSparks((prev) => prev.filter((s) => s._id !== id))
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1>🧠 Manage Your Sparks</h1>
        <p className={styles.subtitle}>
          View, manage, and delete the Sparks you've dropped.
        </p>

        {sparks.length > 0 ? (
          <div className={styles.sparkGrid}>
            {sparks.map((spark) => (
              <div key={spark._id} className={`${styles.sparkCard} ${spark.xpBoost ? styles.boosted : ''}`}>
                <div className={styles.sparkTop}>
                  <h3>{spark.title}</h3>
                  {spark.xpBoost && (
                    <span className={styles.boostedTag}>
                      <Zap size={14} />
                      Boosted
                    </span>
                  )}
                </div>
                <p className={styles.description}>{spark.description}</p>
                <div className={styles.meta}>
                  <span><AlarmClock size={14} /> {spark.urgency}</span>
                  {spark.reward > 0 && (
                    <span><BadgeDollarSign size={14} /> {spark.reward} Sparks</span>
                  )}
                </div>
                <button onClick={() => handleDelete(spark._id)} className={styles.deleteBtn}>
                  <Trash2 size={14} /> Delete Spark
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>You haven’t dropped any Sparks yet.</p>
        )}
      </div>
    </div>
  )
}

export default ManageSparksPage
