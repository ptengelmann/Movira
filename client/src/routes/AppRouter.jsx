import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import HomePage from '../pages/HomePage'
import ExplorePage from '../pages/ExplorePage'
import DropSparkPage from '../pages/DropSparkPage'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import MyApplicationsPage from '../pages/MyApplicationsPage'
import ManageSparksPage from '../pages/ManageSparksPage' // ✅ NEW
import useUserStore from '../store/useUserStore'
import ProfilePage from '../pages/ProfilePage'

const AppRouter = () => {
  const user = useUserStore((state) => state.user)

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Authenticated Routes */}
          <Route
            path="/dashboard"
            element={user ? <DashboardPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/applications"
            element={user ? <MyApplicationsPage /> : <Navigate to="/login" />}
          />

          {/* Dropper-Only Routes */}
          <Route
            path="/spark"
            element={
              user && user.role === 'dropper' ? <DropSparkPage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/manage-sparks"
            element={
              user && user.role === 'dropper' ? <ManageSparksPage /> : <Navigate to="/" />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default AppRouter
