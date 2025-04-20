import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useUserStore from '../store/useUserStore'
import styles from './DashboardPage.module.css' // reuse existing styles
import { Link } from 'react-router-dom'
import { MessageCircleReply } from 'lucide-react'

const MyRepliesPage = () => {
  const { user } = useUserStore()
  const [repliedSparks, setRepliedSparks] = useState([])

  useEffect(() => {
    const fetchRepliedSparks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sparks')
        if (res.data.success) {
          const allSparks = res.data.data
          const myReplies = allSparks
            .map((spark) => {
              const reply = spark.replies.find((r) => r.userId === user._id)
              return reply ? { ...spark, myReply: reply } : null
            })
            .filter(Boolean)

          setRepliedSparks(myReplies)
        }
      } catch (err) {
        console.error('Error fetching replied sparks:', err)
      }
    }

    fetchRepliedSparks()
  }, [user._id])

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>Your Replies</h1>
        <p>These are Sparks you've replied to.</p>

        {repliedSparks.length > 0 ? (
          <ul style={{ marginTop: '20px' }}>
            {repliedSparks.map((spark) => (
              <li
                key={spark._id}
                style={{
                  padding: '12px',
                  borderBottom: '1px solid #ddd',
                  marginBottom: '12px',
                }}
              >
                <strong>{spark.title}</strong> <br />
                <span style={{ fontSize: '14px' }}>
                  You replied: <em>{spark.myReply.message}</em>
                </span>{' '}
                <br />
                <span style={{ fontSize: '12px', color: '#888' }}>
                  {new Date(spark.myReply.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven’t replied to any Sparks yet.</p>
        )}

        <Link to="/explore" style={{ marginTop: '20px', display: 'inline-block', color: 'var(--motion-blue)' }}>
          ← Back to Explore
        </Link>
      </div>
    </div>
  )
}

export default MyRepliesPage
