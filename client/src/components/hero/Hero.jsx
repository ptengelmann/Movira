import React from 'react'
import styles from './Hero.module.css'
import { Link } from 'react-router-dom'
import { Bolt, Handshake, Flame } from 'lucide-react'

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Build <span>Trust</span> Through <span>Action.</span>
        </h1>
        <p className={styles.subtitle}>
          Movira is a real-time trust economy. Show up. Help fast. 
          Earn XP, build your badge, and rise in visibility.
        </p>

        <div className={styles.badgeBar}>
          <div className={styles.badge}><Bolt size={18} /> Real-Time</div>
          <div className={styles.badge}><Handshake size={18} /> Reputation</div>
          <div className={styles.badge}><Flame size={18} /> Sparks & XP</div>
        </div>

        <div className={styles.buttons}>
          <Link to="/spark" className={styles.primaryBtn}>Drop a Spark</Link>
          <Link to="/explore" className={styles.secondaryBtn}>Explore Sparks</Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
