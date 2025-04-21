import React from 'react'
import styles from './Footer.module.css'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Linkedin } from 'lucide-react'
import { SiX } from 'react-icons/si' // ✅ for X (Twitter)

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>Movira</Link>
          <p className={styles.slogan}>Built for trust. Powered by action.</p>
          <div className={styles.socials}>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><Instagram size={18} /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
            <a href="https://x.com" target="_blank" rel="noreferrer"><SiX size={18} /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><Facebook size={18} /></a>
          </div>
        </div>

        <div className={styles.right}>
          <div>
            <h4>Explore</h4>
            <Link to="/explore">Live Sparks</Link>
            <Link to="/spark">Drop a Spark</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div>
            <h4>Movira</h4>
            <Link to="/profile">Profile</Link>
            <Link to="#">Careers</Link>
            <Link to="#">Contact</Link>
          </div>
          <div>
            <h4>Legal</h4>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        © 2025 Movira. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
