import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SparkCard from '../components/spark/SparkCard'
import SparkModal from '../components/spark/SparkModal'
import styles from './ExplorePage.module.css'

const ExplorePage = () => {
  const [sparks, setSparks] = useState([])
  const [loading, setLoading] = useState(true)
  const [tagFilter, setTagFilter] = useState('')
  const [sortOption, setSortOption] = useState('recent')
  const [selectedSpark, setSelectedSpark] = useState(null)

  useEffect(() => {
    const fetchSparks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sparks')
        if (res.data.success) {
          setSparks(res.data.data)
        }
      } catch (err) {
        console.error('Error fetching sparks:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSparks()
  }, [])

  const filteredSparks = sparks
    .filter((spark) =>
      tagFilter ? spark.tag?.toLowerCase().includes(tagFilter.toLowerCase()) : true
    )
    .sort((a, b) => {
      if (sortOption === 'reward') return b.reward - a.reward
      if (sortOption === 'replies') return (b.replies?.length || 0) - (a.replies?.length || 0)
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.heading}>Explore Live Sparks</h2>

      <div className={styles.filterBar}>
        <input
          type="text"
          placeholder="Filter by tag (e.g. Design)"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className={styles.filterInput}
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="recent">Most Recent</option>
          <option value="reward">Highest Reward</option>
          <option value="replies">Most Replies</option>
        </select>
      </div>

      {loading ? (
        <p>Loading sparks...</p>
      ) : filteredSparks.length > 0 ? (
        filteredSparks.map((spark) => (
          <div key={spark._id} onClick={() => setSelectedSpark(spark)} style={{ cursor: 'pointer' }}>
            <SparkCard spark={spark} />
          </div>
        ))
      ) : (
        <p>No Sparks yet. Be the first to drop one!</p>
      )}

      {selectedSpark && (
        <SparkModal spark={selectedSpark} onClose={() => setSelectedSpark(null)} />
      )}
    </div>
  )
}

export default ExplorePage
