import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SparkCard from '../components/spark/SparkCard'

const ExplorePage = () => {
  const [sparks, setSparks] = useState([])
  const [loading, setLoading] = useState(true)

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

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h2>Explore Live Sparks</h2>
      {loading ? (
        <p>Loading sparks...</p>
      ) : sparks.length > 0 ? (
        sparks.map((spark) => (
          <SparkCard key={spark._id} spark={spark} />
        ))
      ) : (
        <p>No Sparks yet. Be the first to drop one!</p>
      )}
    </div>
  )
}

export default ExplorePage
