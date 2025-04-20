import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import useUserStore from '../../store/useUserStore'

const Navbar = () => {
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
              <Link to="/my-replies">My Replies</Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault()
                  logout()
                }}
                className={styles.navLink}
              >
                Logout
              </Link>
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
