import React from 'react'
import { Navigate } from 'react-router-dom'
import SparkForm from '../components/spark/SparkForm'
import useUserStore from '../store/useUserStore'

const DropSparkPage = () => {
  const { user } = useUserStore()

  if (user?.role !== 'dropper') {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div style={{ padding: '40px 20px' }}>
      <SparkForm />
    </div>
  )
}

export default DropSparkPage
