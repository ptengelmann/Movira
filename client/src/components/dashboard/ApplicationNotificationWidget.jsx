import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useUserStore from '../../store/useUserStore'
import styles from './ApplicationNotificationWidget.module.css'

const ApplicationNotificationWidget = () => {
  const { user } = useUserStore()
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sparks')
        if (res.data.success) {
          const sparks = res.data.data
          const userSparks = sparks.filter((s) => s.userId === user._id)

          const allApplications = userSparks.flatMap((spark) =>
            spark.applications.map((app) => ({
              sparkTitle: spark.title,
              applicant: app.username,
              message: app.message,
              createdAt: app.createdAt,
            }))
          )

          // Sort by newest application
          const sorted = allApplications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          setApplications(sorted.slice(0, 3))
        }
      } catch (err) {
        console.error('Error fetching applications:', err)
      }
    }

    fetchApplications()
  }, [user._id])

  if (applications.length === 0) return null

  return (
    <div className={styles.notificationCard}>
      <h4 className={styles.heading}>New Applications</h4>
      <ul className={styles.list}>
        {applications.map((app, i) => (
          <li key={i} className={styles.item}>
            <span><strong>{app.applicant}</strong> applied to <em>{app.sparkTitle}</em></span>
            <p className={styles.message}>“{app.message}”</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ApplicationNotificationWidget
