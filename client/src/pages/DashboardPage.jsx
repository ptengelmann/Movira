import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useUserStore from '../store/useUserStore'
import styles from './DashboardPage.module.css'

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

        <h3 style={{ marginTop: '30px' }}>Your Sparks</h3>
        {userSparks.length > 0 ? (
          <ul>
            {userSparks.map((spark) => (
              <li key={spark._id}>
                <strong>{spark.title}</strong> – {spark.reward} Sparks
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven’t dropped any Sparks yet.</p>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
