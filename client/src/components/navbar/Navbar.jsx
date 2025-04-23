import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'
import useUserStore from '../../store/useUserStore'
import logo from "/assets/movira.svg"

const Navbar = () => {
  const { user, logout } = useUserStore()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Movira" />
        </Link>
      </div>

      <ul className={styles.navLinks}>
        <li>
          <Link to="/explore" className={isActive('/explore') ? styles.active : ''}>Explore</Link>
        </li>

        {user ? (
          <>
            {user.role === 'dropper' && (
              <li>
                <Link to="/spark" className={styles.sparkBtn}>Drop a Spark</Link>
              </li>
            )}
            <li>
              <Link to="/dashboard" className={isActive('/dashboard') ? styles.active : ''}>Dashboard</Link>
            </li>
            <li>
              <Link
                to="/applications"
                className={isActive('/applications') ? styles.active : ''}
              >
                {user.role === 'dropper' ? 'Applications' : 'My Applications'}
              </Link>
            </li>
            <li>
              <Link to="/profile" className={isActive('/profile') ? styles.active : ''}>Profile</Link>
            </li>
            <li>
              <Link onClick={logout} className={styles.logoutBtn}>Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup" className={isActive('/signup') ? styles.active : ''}>Sign Up</Link>
            </li>
            <li>
              <Link to="/login" className={isActive('/login') ? styles.active : ''}>Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
