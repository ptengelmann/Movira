import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import HomePage from '../pages/HomePage'
import ExplorePage from '../pages/ExplorePage'
import DropSparkPage from '../pages/DropSparkPage'



const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/spark" element={<DropSparkPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default AppRouter
