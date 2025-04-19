import React from 'react'
import styles from './Hero.module.css'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Where <span>Action</span> Builds Trust.
        </h1>
        <p className={styles.subtitle}>
          Movira is the real-time ecosystem where creators and solvers earn reputation by showing up, helping fast, and making things move.
        </p>
        <div className={styles.buttons}>
          <Link to="/spark" className={styles.primaryBtn}>Drop a Spark</Link>
          <Link to="/explore" className={styles.secondaryBtn}>Explore Sparks</Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
