import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useUserStore from '../store/useUserStore'
import styles from './DashboardPage.module.css'
import StatsWidget from '../components/dashboard/StatsWidget'
import { Sparkles, TrendingUp, MessageCircle } from 'lucide-react'
import SparkCard from '../components/spark/SparkCard'
import ProgressWidget from '../components/dashboard/ProgressWidget'
import ReplyNotificationWidget from '../components/dashboard/ReplyNotificationWidget'
import XPBadge from '../components/dashboard/XPBadge'

const DashboardPage = () => {
  const { user } = useUserStore()
  const [userSparks, setUserSparks] = useState([])

  useEffect(() => {
    if (user?.role === 'dropper') {
      const fetchSparks = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/sparks/user/${user._id}`)
          if (res.data.success) {
            setUserSparks(res.data.data)
          }
        } catch (err) {
          console.error('Error fetching user sparks:', err)
        }
      }
      fetchSparks()
    }
  }, [user])

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

        {/* Role Card for Dropper */}
        {user?.role === 'dropper' && (
          <div className={styles.roleCardDropper}>
            <MessageCircle size={20} />
            <div>
              <strong>Your Role: Dropper</strong>
              <p>
                Post Sparks when you need help. The community responds in real time, and you build trust by
                participating.
              </p>
            </div>
          </div>
        )}

        {/* Role Card for Responder */}
        {user?.role === 'responder' && (
          <div className={styles.roleCardResponder}>
            <MessageCircle size={20} />
            <div>
              <strong>Your Role: Responder</strong>
              <p>
                Head to <strong>Explore</strong> to start helping others and earn XP.
              </p>
            </div>
          </div>
        )}

        <ReplyNotificationWidget />

        {/* Dropper's Sparks List */}
        {user?.role === 'dropper' && (
          <>
            <h3>Your Sparks</h3>
            {userSparks.length > 0 ? (
              <div className={styles.sparkGrid}>
                {userSparks.map((spark) => (
                  <SparkCard
                    key={spark._id}
                    spark={spark}
                    onDelete={(id) => {
                      if (window.confirm('Delete this Spark?')) {
                        axios.delete(`http://localhost:5000/api/sparks/${id}`)
                        setUserSparks((prev) => prev.filter((s) => s._id !== id))
                      }
                    }}
                  />
                ))}
              </div>
            ) : (
              <p><em>You haven’t dropped any Sparks yet.</em></p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
