import React, { useState } from 'react'
import styles from './ApplicationForm.module.css'
import axios from 'axios'
import useUserStore from '../../store/useUserStore'

const ApplicationForm = ({ sparkId, onApplicationSubmit }) => {
  const { user, setUser } = useUserStore()
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    try {
      const res = await axios.post(`http://localhost:5000/api/sparks/${sparkId}/apply`, {
        userId: user._id,
        username: user.name,
        message,
      })

      if (res.data.success) {
        setMessage('')
        onApplicationSubmit?.(res.data.data.applications)
        if (res.data.user) {
          setUser({ user: res.data.user, token: localStorage.getItem('token') })
        }
      }
    } catch (err) {
      console.error('Application failed:', err)
    }
  }

  if (!user) {
    return (
      <p style={{ fontSize: '14px', color: '#333', marginTop: '12px' }}>
        Login to apply to this Spark.
      </p>
    )
  }

  return (
    <form className={styles.applicationForm} onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Why do you want to help with this Spark?"
        rows={3}
        required
      />
      <button type="submit">Apply to Help</button>
    </form>
  )
}

export default ApplicationForm
