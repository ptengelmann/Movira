import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import HomePage from '../pages/HomePage'
import ExplorePage from '../pages/ExplorePage'
import DropSparkPage from '../pages/DropSparkPage'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'




const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/spark" element={<DropSparkPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default AppRouter
