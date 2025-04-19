import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
  const location = useLocation()

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">Movira</Link>
      </div>

      <ul className={styles.navLinks}>
        <li className={location.pathname === '/explore' ? styles.active : ''}>
          <Link to="/explore">Explore</Link>
        </li>
        <li className={location.pathname === '/pods' ? styles.active : ''}>
          <Link to="/pods">Pods</Link>
        </li>
        <li>
          <Link to="/spark" className={styles.sparkBtn}>Drop a Spark</Link>
        </li>
        <li>
        <Link to="/signup">Sign Up</Link>
        </li>
        <li>
  <Link to="/login">Login</Link>
</li>
      </ul>
    </nav>
  )
}

export default Navbar
