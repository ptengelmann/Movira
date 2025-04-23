import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import dashboardStyles from './DashboardPage.module.css'
import appStyles from './MyApplicationsPage.module.css'
import { ChevronDown, ChevronUp, ClipboardList, AlarmClock, BadgeDollarSign, Zap } from 'lucide-react'

const MyApplicationsPage = () => {
  const { user } = useUserStore()
  const [userSparks, setUserSparks] = useState([])
  const [expanded, setExpanded] = useState({})

  useEffect(() => {
    const fetchSparks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sparks')
        if (res.data.success && user.role === 'dropper') {
          const sparks = res.data.data.filter((spark) => spark.userId === String(user._id))
          setUserSparks(sparks)
        }
      } catch (err) {
        console.error('Error fetching sparks:', err)
      }
    }

    fetchSparks()
  }, [user._id, user.role])

  return (
    <div className={dashboardStyles.wrapper}>
      <div className={dashboardStyles.card}>
        <h1>Your Spark Applications</h1>
        <p style={{ color: '#333', fontSize: '16px' }}>
          These are Sparks you’ve dropped and who has applied to help.
        </p>

        {userSparks.length > 0 ? (
          <div className={appStyles.applicationList}>
            {userSparks.map((spark) => (
              <div key={spark._id} className={appStyles.sparkContainer}>
<div className={`${appStyles.sparkCardPreview} ${spark.xpBoost ? appStyles.boostedCard : ''}`}>
<div className={appStyles.sparkTopRow}>
                    <div className={appStyles.sparkTitle}>
                      <ClipboardList size={16} />
                      <strong>{spark.title}</strong>
                      {spark.xpBoost && (
                        <span className={appStyles.boostedTag}>
                          <Zap size={14} />
                          Boosted
                        </span>
                      )}
                    </div>
                    <p className={appStyles.sparkDescription}>{spark.description}</p>
                    <div className={appStyles.metaRow}>
                      <span><AlarmClock size={14} /> {spark.urgency}</span>
                      {spark.reward > 0 && (
                        <span><BadgeDollarSign size={14} /> {spark.reward} Sparks</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Toggle Button */}
                <button
                  className={appStyles.toggleBtn}
                  onClick={() =>
                    setExpanded((prev) => ({
                      ...prev,
                      [spark._id]: !prev[spark._id],
                    }))
                  }
                >
                  {expanded[spark._id] ? (
                    <>
                      <ChevronUp size={16} />
                      Hide Applications
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} />
                      Show Applications ({spark.applications?.length || 0})
                    </>
                  )}
                </button>

                {expanded[spark._id] && (
                  <div className={appStyles.applicationsBox}>
                    {spark.applications?.length > 0 ? (
                      spark.applications.map((a, i) => (
                        <div key={i} className={appStyles.appEntry}>
                          <p><strong>{a.username}:</strong> {a.message}</p>
                          <span className={appStyles.timestamp}>
                            {new Date(a.createdAt).toLocaleString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: '#888', fontSize: '14px' }}>No applications yet.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#555', fontSize: '15px', marginTop: '20px' }}>
            No applications on your Sparks yet.
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
