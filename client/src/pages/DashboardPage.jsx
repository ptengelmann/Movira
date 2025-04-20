import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useUserStore from '../store/useUserStore'
import styles from './DashboardPage.module.css'
import StatsWidget from '../components/dashboard/StatsWidget'
import { Sparkles, ShieldCheck, TrendingUp } from 'lucide-react'
import SparkCard from '../components/spark/SparkCard'


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
        console.error('Error fetching user sparks:', err)
      }
    }

    fetchSparks()
  }, [user._id])

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>Welcome back, {user?.name} 👋</h1>
        <p>You currently have <strong>{user?.xp || 0}</strong> XP.</p>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '30px' }}>
  <StatsWidget label="XP" value={user?.xp || 0} icon={<Sparkles />} />
  <StatsWidget label="Trust Level" value="Rising" icon={<TrendingUp />} />
  </div>
        <h3 style={{ marginTop: '30px' }}>Your Sparks</h3>
        {userSparks.length > 0 ? (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
    {userSparks.map((spark) => (
      <SparkCard key={spark._id} spark={spark} />
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
