import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'
import useUserStore from '../../store/useUserStore'

const Navbar = () => {
  const location = useLocation()
  const { user, logout } = useUserStore()

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">Movira</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/explore">Explore</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/spark">Drop a Spark</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={logout} className={styles.logoutBtn}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
