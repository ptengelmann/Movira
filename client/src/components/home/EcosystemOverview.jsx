import React from 'react'
import styles from './EcosystemOverview.module.css'
import { Flame, UsersRound, BrainCircuit, ShieldCheck } from 'lucide-react'

const EcosystemOverview = () => {
  return (
    <section className={styles.ecosystem}>
      <h2 className={styles.heading}>Inside the Movira Ecosystem</h2>
      <p className={styles.subheading}>
        A real-time, action-first network where everyone contributes, builds trust, and levels up.
      </p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <Flame size={32} className={styles.icon} />
          <h3>Sparks</h3>
          <p>Moments of need, ideas, or urgency. Users drop Sparks to ask for help or action — fast.</p>
        </div>
        <div className={styles.card}>
          <UsersRound size={32} className={styles.icon} />
          <h3>Solvers</h3>
          <p>People who jump in and help. Anyone can reply to a Spark and earn XP by solving problems.</p>
        </div>
        <div className={styles.card}>
          <BrainCircuit size={32} className={styles.icon} />
          <h3>XP & Levels</h3>
          <p>Every action earns XP. XP builds your Trust Level, unlocking new opportunities & recognition.</p>
        </div>
        <div className={styles.card}>
          <ShieldCheck size={32} className={styles.icon} />
          <h3>Reputation</h3>
          <p>Your Movira profile becomes your live resume — built on speed, support, and trust.</p>
        </div>
      </div>
    </section>
  )
}

export default EcosystemOverview
