import React from 'react'
import styles from './HowItWorks.module.css'
import { MessageCircle, Zap, Star, TrendingUp } from 'lucide-react'

const steps = [
  {
    icon: <Zap size={32} />,
    title: 'Drop a Spark',
    description: 'Launch a fast, actionable request that needs solving. Keep it clear, time-sensitive, and to the point.'
  },
  {
    icon: <MessageCircle size={32} />,
    title: 'Get Real-Time Replies',
    description: 'Movira connects you instantly with solvers who want to help. Replies come in quickly.'
  },
  {
    icon: <Star size={32} />,
    title: 'Reward & Rate',
    description: 'Rate replies based on usefulness. You can optionally reward others with Sparks.'
  },
  {
    icon: <TrendingUp size={32} />,
    title: 'Grow Your Reputation',
    description: 'Every action earns XP and increases your Trust Level inside the ecosystem.'
  }
]

const HowItWorks = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>How It Works</h2>
      <div className={styles.grid}>
        {steps.map((step, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.icon}>{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
