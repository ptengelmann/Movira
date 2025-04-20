import React, { useState } from 'react'
import axios from 'axios'
import styles from './SparkForm.module.css'
import useUserStore from '../../store/useUserStore'

const SparkForm = () => {
  const { user } = useUserStore()
  const [spark, setSpark] = useState({
    title: '',
    description: '',
    tag: '',
    urgency: '1hr',
    reward: '',
  })

  const handleChange = (e) => {
    setSpark({ ...spark, [e.target.name]: e.target.value })
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
        setSpark({
          title: '',
          description: '',
          tag: '',
          urgency: '1hr',
          reward: '',
        })
      }
    } catch (err) {
      alert('Error launching Spark. Try again.')
      console.error(err)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Drop a Spark</h2>

      <label>Title</label>
      <input
        type="text"
        name="title"
        placeholder="What do you need help with?"
        value={spark.title}
        onChange={handleChange}
        required
      />

      <label>Description</label>
      <textarea
        name="description"
        placeholder="Describe what you're looking for"
        rows="4"
        value={spark.description}
        onChange={handleChange}
        required
      />

      <label>Tag</label>
      <input
        type="text"
        name="tag"
        placeholder="e.g. Design, Branding, Startup"
        value={spark.tag}
        onChange={handleChange}
      />

      <label>Urgency</label>
      <select name="urgency" value={spark.urgency} onChange={handleChange}>
        <option value="15min">15 minutes</option>
        <option value="1hr">1 hour</option>
        <option value="24hr">24 hours</option>
      </select>

      <label>Optional Reward</label>
      <input
        type="number"
        name="reward"
        placeholder="e.g. 10 (Spark Credits)"
        value={spark.reward}
        onChange={handleChange}
      />

      <button type="submit">Launch Spark</button>
    </form>
  )
}

export default SparkForm
