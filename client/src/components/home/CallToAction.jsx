import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CallToAction.module.css'

const CallToAction = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2>Ready to Spark Action?</h2>
        <p>Join the ecosystem where reputation is earned and momentum matters.</p>
        <div className={styles.buttons}>
          <Link to="/spark" className={styles.primaryBtn}>Drop a Spark</Link>
          <Link to="/explore" className={styles.secondaryBtn}>Explore Sparks</Link>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
