import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SparkCard from '../components/spark/SparkCard'

const ExplorePage = () => {
  const [sparks, setSparks] = useState([])
  const [filteredSparks, setFilteredSparks] = useState([])
  const [loading, setLoading] = useState(true)
  const [tagFilter, setTagFilter] = useState('')
  const [sortOption, setSortOption] = useState('recent')

  useEffect(() => {
    const fetchSparks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sparks')
        if (res.data.success) {
          setSparks(res.data.data)
          setFilteredSparks(res.data.data)
        }
      } catch (err) {
        console.error('Error fetching sparks:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSparks()
  }, [])

  useEffect(() => {
    let result = [...sparks]

    if (tagFilter) {
      result = result.filter((spark) =>
        spark.tag?.toLowerCase().includes(tagFilter.toLowerCase())
      )
    }

    switch (sortOption) {
      case 'reward':
        result.sort((a, b) => b.reward - a.reward)
        break
      case 'replies':
        result.sort((a, b) => (b.replies?.length || 0) - (a.replies?.length || 0))
        break
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    setFilteredSparks(result)
  }, [tagFilter, sortOption, sparks])

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <h2>Explore Live Sparks</h2>

      {/* 🔍 Filters */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Filter by tag..."
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '200px',
          }}
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        >
          <option value="recent">Most Recent</option>
          <option value="reward">Highest Reward</option>
          <option value="replies">Most Replies</option>
        </select>
      </div>

      {loading ? (
        <p>Loading sparks...</p>
      ) : filteredSparks.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {filteredSparks.map((spark) => (
            <SparkCard key={spark._id} spark={spark} />
          ))}
        </div>
      ) : (
        <p>No Sparks found with those filters.</p>
      )}
    </div>
  )
}

export default ExplorePage
