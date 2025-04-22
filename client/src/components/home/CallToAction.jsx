import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CallToAction.module.css'
import { Sparkles } from 'lucide-react'

const CallToAction = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <Sparkles size={32} />
        </div>
        <h2>Ready to Spark Real Momentum?</h2>
        <p>Join Movira and turn trust into action.</p>
        <Link to="/signup" className={styles.primaryBtn}>Join Movira</Link>
      </div>
    </section>
  )
}

export default CallToAction
