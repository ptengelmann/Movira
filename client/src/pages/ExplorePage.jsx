import React from 'react'
import SparkCard from '../components/spark/SparkCard'

const mockSparks = [
  {
    id: 1,
    title: 'Need quick UI feedback',
    description: 'Just redesigned the signup page, would love your thoughts.',
    tag: 'Design',
    time: '12 min ago',
    reward: 10,
  },
  {
    id: 2,
    title: 'Help me name my new AI app',
    description: 'I’ve got 3 ideas — need fresh eyes to choose the best.',
    tag: 'Branding',
    time: '24 min ago',
  },
  {
    id: 3,
    title: 'Looking for feedback on elevator pitch',
    description: '60-sec pitch for new product — honest feedback welcome.',
    tag: 'Startups',
    time: '1 hour ago',
    reward: 20,
  },
]

const ExplorePage = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h2>Explore Live Sparks</h2>
      {mockSparks.map((spark) => (
        <SparkCard key={spark.id} spark={spark} />
      ))}
    </div>
  )
}

export default ExplorePage
