import React from 'react'
import styles from './WhyMovira.module.css'
import { Zap, CheckCircle, Shield, Clock } from 'lucide-react'

const WhyMovira = () => {
  return (
    <section className={styles.whySection}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h2>Why Trust Needs Movement.</h2>
          <p className={styles.subheading}>
            Movira isn’t just another help forum. It’s a real-time ecosystem where your actions build reputation — not clout.
          </p>

          <div className={styles.reasons}>
            <div className={styles.reason}>
              <Zap size={24} className={styles.icon} />
              <div>
                <h4>Real-Time Trust Loop</h4>
                <p>Drop a spark, help instantly, and grow your reputation in real-time.</p>
              </div>
            </div>

            <div className={styles.reason}>
              <CheckCircle size={24} className={styles.icon} />
              <div>
                <h4>Verified by Action</h4>
                <p>Gain XP and levels through real contributions, not likes or clout.</p>
              </div>
            </div>

            <div className={styles.reason}>
              <Shield size={24} className={styles.icon} />
              <div>
                <h4>Transparent Reputation</h4>
                <p>Everything’s visible — sparks, replies, XP and trust levels are public.</p>
              </div>
            </div>

            <div className={styles.reason}>
              <Clock size={24} className={styles.icon} />
              <div>
                <h4>Built for Velocity</h4>
                <p>No fluff. Just fast interactions, fast growth, fast outcomes.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.graphic}>
            <div className={styles.sparkCore}>⚡</div>
            <div className={styles.xpBar}>
              <div className={styles.fill}></div>
              <span>XP</span>
            </div>
            <div className={styles.levelTag}>Trust Level: Rising</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyMovira
