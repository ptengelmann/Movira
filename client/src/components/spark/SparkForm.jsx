import React, { useState } from 'react'
import axios from 'axios'
import styles from './SparkForm.module.css'
import useUserStore from '../../store/useUserStore'
import { useNavigate } from 'react-router-dom'
import { Sparkles, AlarmClock, BadgeDollarSign } from 'lucide-react'

const SparkForm = () => {
  const { user, setUser } = useUserStore()
  const navigate = useNavigate()

  const [spark, setSpark] = useState({
    title: '',
    description: '',
    tag: '',
    urgency: '1hr',
    reward: '',
    xpBoost: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSpark((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/sparks', {
        ...spark,
        userId: user._id,
      })

      if (res.data.success) {
        alert('Spark launched successfully!')
        const fullUser = {
          ...user,
          xp: res.data.user?.xp || user.xp,
        }
        setUser({ user: fullUser, token: localStorage.getItem('token') })

        setSpark({
          title: '',
          description: '',
          tag: '',
          urgency: '1hr',
          reward: '',
          xpBoost: false,
        })

        navigate('/dashboard')
      }
    } catch (err) {
      alert('Error launching Spark. Try again.')
      console.error(err)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}><Sparkles size={24} /> Drop a Spark</h2>

      <div className={styles.group}>
        <label>Title</label>
        <input
          name="title"
          placeholder="What do you need help with?"
          value={spark.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.group}>
        <label>Description</label>
        <textarea
          name="description"
          placeholder="Describe what you're looking for"
          value={spark.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      <div className={styles.inlineGroup}>
        <div className={styles.group}>
          <label>Tag</label>
          <input
            name="tag"
            placeholder="e.g. Design, Branding, Startup"
            value={spark.tag}
            onChange={handleChange}
          />
        </div>

        <div className={styles.group}>
          <label><AlarmClock size={16} /> Urgency</label>
          <select name="urgency" value={spark.urgency} onChange={handleChange}>
            <option value="15min">15 minutes</option>
            <option value="1hr">1 hour</option>
            <option value="24hr">24 hours</option>
          </select>
        </div>
      </div>

      <div className={styles.inlineGroup}>
        <div className={styles.group}>
          <label><BadgeDollarSign size={16} /> Optional Reward</label>
          <input
            name="reward"
            type="number"
            placeholder="e.g. 10 (Spark Credits)"
            value={spark.reward}
            onChange={handleChange}
          />
        </div>

        <div className={styles.group}>
          <label>XP Boost</label>
          <div className={styles.xpBoostBox}>
            <input
              type="checkbox"
              name="xpBoost"
              checked={spark.xpBoost}
              onChange={handleChange}
            />
            <span>Activate XP Boost (+3 XP)</span>
          </div>
        </div>
      </div>

      <button type="submit">Launch Spark</button>
    </form>
  )
}

export default SparkForm
