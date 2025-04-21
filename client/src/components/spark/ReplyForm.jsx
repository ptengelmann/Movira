import React, { useState } from 'react'
import styles from './ReplyForm.module.css'
import axios from 'axios'
import useUserStore from '../../store/useUserStore'

const ReplyForm = ({ sparkId, onReplySubmit }) => {
  const { user, setUser } = useUserStore()
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    try {
      const res = await axios.post(`http://localhost:5000/api/sparks/${sparkId}/reply`, {
        userId: user._id,
        username: user.name,
        message,
      })

      if (res.data.success) {
        setMessage('')
        onReplySubmit(res.data.data.replies)
        if (res.data.user) {
          setUser({ user: res.data.user, token: localStorage.getItem('token') })
        }
      }
    } catch (err) {
      console.error('Reply failed:', err)
    }
  }

  if (!user) {
    return (
      <p style={{ fontSize: '14px', color: '#333', marginTop: '12px' }}>
        Login to reply to this Spark.
      </p>
    )
  }

  return (
    <form className={styles.replyForm} onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Drop a reply..."
        required
      />
      <button type="submit">Reply</button>
    </form>
  )
}

export default ReplyForm
