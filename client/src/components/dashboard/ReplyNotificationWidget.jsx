import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useUserStore from '../../store/useUserStore'

const ReplyNotificationWidget = () => {
  const { user } = useUserStore()
  const [repliesToMySparks, setRepliesToMySparks] = useState([])

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sparks')
        if (res.data.success) {
          const allSparks = res.data.data
          const mySparkReplies = allSparks
            .filter((spark) => spark.userId === user._id)
            .flatMap((spark) =>
              spark.replies.map((reply) => ({
                title: spark.title,
                reply,
              }))
            )

          setRepliesToMySparks(mySparkReplies)
        }
      } catch (err) {
        console.error('Error fetching spark replies:', err)
      }
    }

    fetchReplies()
  }, [user._id])

  if (repliesToMySparks.length === 0) return null

  return (
    <div style={{ marginTop: '20px', background: '#f9f9f9', padding: '16px', borderRadius: '8px' }}>
      <h4>🗨️ You’ve got replies!</h4>
      <ul style={{ marginTop: '10px' }}>
        {repliesToMySparks.slice(0, 3).map((item, i) => (
          <li key={i} style={{ fontSize: '14px', marginBottom: '8px' }}>
            <strong>{item.reply.username || 'Someone'}</strong> replied to <em>{item.title}</em>: "{item.reply.message}"
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReplyNotificationWidget
