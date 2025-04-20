import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useUserStore from '../store/useUserStore'
import styles from './DashboardPage.module.css'
import StatsWidget from '../components/dashboard/StatsWidget'
import { Sparkles, TrendingUp } from 'lucide-react'
import SparkCard from '../components/spark/SparkCard'
import ProgressWidget from '../components/dashboard/ProgressWidget'
import ReplyNotificationWidget from '../components/dashboard/ReplyNotificationWidget' // ✅ add this



const DashboardPage = () => {
  const { user } = useUserStore()
  const [userSparks, setUserSparks] = useState([])

  // Fetch user's sparks
  useEffect(() => {
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
  }, [user._id])

  // Handle deletion
  const handleDelete = async (sparkId) => {
    if (!window.confirm('Are you sure you want to delete this Spark?')) return
    try {
      await axios.delete(`http://localhost:5000/api/sparks/${sparkId}`)
      setUserSparks((prev) => prev.filter((s) => s._id !== sparkId))
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  // ✅ Trust level logic
  const getTrustLevel = () => {
    const xp = user?.xp || 0
    const sparks = userSparks.length

    if (xp >= 100 && sparks >= 25) return 'Verified'
    if (xp >= 50 && sparks >= 10) return 'Trusted'
    if (xp >= 20 && sparks >= 2) return 'Rising'
    return 'New'
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>Welcome back, {user?.name} 👋</h1>
        <p>You currently have <strong>{user?.xp || 0}</strong> XP.</p>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '30px' }}>
          <StatsWidget label="XP" value={user?.xp || 0} icon={<Sparkles />} />
          <StatsWidget label="Trust Level" value={getTrustLevel()} icon={<TrendingUp />} />
        </div>
        <ReplyNotificationWidget /> 

        <div style={{ marginTop: '20px' }}>
  <ProgressWidget currentXP={user?.xp || 0} />
</div>

        <h3 style={{ marginTop: '30px' }}>Your Sparks</h3>
        {userSparks.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
            {userSparks.map((spark) => (
              <SparkCard key={spark._id} spark={spark} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <p>You haven’t dropped any Sparks yet.</p>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
