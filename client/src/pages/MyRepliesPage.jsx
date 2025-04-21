import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import dashboardStyles from './DashboardPage.module.css'
import replyStyles from './MyRepliesPage.module.css'
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
    <div className={dashboardStyles.wrapper}>
      <div className={dashboardStyles.card}>
        <h1>Your Replies</h1>
        <p>These are Sparks you've replied to.</p>

        {repliedSparks.length > 0 ? (
          <ul className={replyStyles.replyList}>
            {repliedSparks.map((spark) => (
              <li className={replyStyles.replyItem} key={spark._id}>
                <div className={replyStyles.replyHeader}>
                  <MessageCircleReply size={18} />
                  <strong>{spark.title}</strong>
                </div>
                <p className={replyStyles.replyMessage}>
                  You replied: <em>{spark.myReply.message}</em>
                </p>
                <span className={replyStyles.timestamp}>
                  {new Date(spark.myReply.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven’t replied to any Sparks yet.</p>
        )}

        <Link to="/explore" className={replyStyles.backLink}>
          ← Back to Explore
        </Link>
      </div>
    </div>
  )
}

export default MyRepliesPage
