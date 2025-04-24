import React, { useEffect, useState } from 'react'
import useUserStore from '../store/useUserStore'
import styles from './DashboardPage.module.css'
import StatsWidget from '../components/dashboard/StatsWidget'
import ProgressWidget from '../components/dashboard/ProgressWidget'
import XPBadge from '../components/dashboard/XPBadge'
import {
  Sparkles,
  TrendingUp,
  MessageCircle,
  Trash2,
  AlarmClock,
  BadgeDollarSign,
  Zap
} from 'lucide-react'
import axios from 'axios'

const DashboardPage = () => {
  const { user } = useUserStore()
  const [userSparks, setUserSparks] = useState([])

  useEffect(() => {
    const fetchSparks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/sparks/user/${user._id}`)
        if (res.data.success) {
          setUserSparks(res.data.data)
        }
      } catch (err) {
        console.error('Error fetching sparks:', err)
      }
    }

    if (user?.role === 'dropper') fetchSparks()
  }, [user])

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Spark?')
    if (!confirmDelete) return

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
        <h1>👋 Welcome back, {user?.name}</h1>
        <p className={styles.description}>
          You have <strong>{user?.xp || 0} XP</strong> — keep building your badge and reputation!
        </p>

        <div className={styles.statsRow}>
          <StatsWidget label="XP" value={user?.xp || 0} icon={<Sparkles />} />
          <StatsWidget label="Badge" value={<XPBadge xp={user?.xp || 0} />} icon={<TrendingUp />} />
        </div>

        <ProgressWidget currentXP={user?.xp || 0} />

        {user?.role === 'dropper' && (
          <>
            <div className={styles.roleCardDropper}>
              <MessageCircle size={20} />
              <div>
                <strong>Your Role: Dropper</strong>
                <p>
                  Post Sparks when you need help. Helpers send private applications with proposals.
                </p>
              </div>
            </div>

            {/* 🔥 Manage Sparks */}
            <h3 className={styles.sectionTitle}>Manage Your Sparks</h3>
            {userSparks.length > 0 ? (
              <div className={styles.sparkGrid}>
                {userSparks.map((spark) => (
                  <div
                    key={spark._id}
                    className={`${styles.sparkCard} ${
                      spark.xpBoost ? styles.boostedCard : ''
                    }`}
                  >
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
          </>
        )}

        {user?.role === 'responder' && (
          <div className={styles.roleCardResponder}>
            <MessageCircle size={20} />
            <div>
              <strong>Your Role: Responder</strong>
              <p>
                Head to <strong>Explore</strong> to apply to Sparks and earn XP.
              </p>

              <Link to="/manage-sparks" className={styles.linkBtn}>
  → Go to Manage Sparks
</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
