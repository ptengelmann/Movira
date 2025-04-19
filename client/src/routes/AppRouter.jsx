import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import HomePage from '../pages/HomePage'
import ExplorePage from '../pages/ExplorePage'
import DropSparkPage from '../pages/DropSparkPage'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'
import useUserStore from '../store/useUserStore'

const AppRouter = () => {
  const user = useUserStore((state) => state.user)

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route
            path="/spark"
            element={user ? <DropSparkPage /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Future protected routes */}
          {/* <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default AppRouter
