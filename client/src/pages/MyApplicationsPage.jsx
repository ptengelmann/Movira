import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import dashboardStyles from './DashboardPage.module.css'
import appStyles from './MyApplicationsPage.module.css'
import { ClipboardCheck } from 'lucide-react'

const MyApplicationsPage = () => {
  const { user } = useUserStore()
  const [appliedSparks, setAppliedSparks] = useState([])

  useEffect(() => {
    const fetchAppliedSparks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sparks')
        if (res.data.success) {
          const allSparks = res.data.data
          const myApps = allSparks
            .map((spark) => {
              const application = spark.applications?.find((a) => a.userId === String(user._id))
              return application ? { ...spark, myApplication: application } : null
            })
            .filter(Boolean)

          setAppliedSparks(myApps)
        }
      } catch (err) {
        console.error('Error fetching applications:', err)
      }
    }

    fetchAppliedSparks()
  }, [user._id])

  return (
    <div className={dashboardStyles.wrapper}>
      <div className={dashboardStyles.card}>
        <h1>Your Applications</h1>
        <p style={{ color: '#333', fontSize: '16px' }}>
          These are Sparks you’ve applied to.
        </p>

        {appliedSparks.length > 0 ? (
          <ul className={appStyles.applicationList}>
            {appliedSparks.map((spark) => (
              <li className={appStyles.applicationItem} key={spark._id}>
                <div className={appStyles.applicationHeader}>
                  <ClipboardCheck size={18} />
                  <strong>{spark.title}</strong>
                </div>
                <p className={appStyles.applicationMessage}>
                  You applied: <em>{spark.myApplication.message}</em>
                </p>
                <span className={appStyles.timestamp}>
                  {new Date(spark.myApplication.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#555', fontSize: '15px', marginTop: '20px' }}>
            You haven’t applied to any Sparks yet.
          </p>
        )}

        <Link to="/explore" className={appStyles.backLink}>
          ← Back to Explore
        </Link>
      </div>
    </div>
  )
}

export default MyApplicationsPage
