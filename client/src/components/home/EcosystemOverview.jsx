import React from 'react'
import styles from './EcosystemOverview.module.css'
import { Flame, Sparkles, ShieldCheck } from 'lucide-react'

const EcosystemOverview = () => {
  return (
    <section className={styles.ecosystem}>
      <h2 className={styles.title}>The Movira Ecosystem</h2>
      <p className={styles.subtitle}>
        A real-time loop of trust, action, and reputation.
      </p>

      <div className={styles.diagram}>
        <div className={styles.role}>
          <h3 className={styles.dropperTitle}>Droppers</h3>
          <p>Need help with a task or idea. They drop <span className={styles.spark}>Sparks</span>.</p>
        </div>

        <div className={styles.flowArrow}>→</div>

        <div className={styles.middle}>
          <Flame size={36} className={styles.sparkIcon} />
          <p className={styles.flowText}>Spark is answered</p>
          <div className={styles.badges}>
            <span className={styles.xp}>+3 XP</span>
            <span className={styles.trust}>Earn Trust</span>
          </div>
        </div>

        <div className={styles.flowArrow}>→</div>

        <div className={styles.role}>
          <h3 className={styles.responderTitle}>Responders</h3>
          <p>Step up to help. Gain XP and rise in <span className={styles.trustLevel}>Trust Level</span>.</p>
        </div>
      </div>

      <div className={styles.bottomNote}>
        <ShieldCheck size={20} /> The more you help, the more visible, trusted, and valuable you become.
      </div>
    </section>
  )
}

export default EcosystemOverview
