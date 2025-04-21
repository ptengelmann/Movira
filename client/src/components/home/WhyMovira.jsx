import React from 'react'
import styles from './WhyMovira.module.css'
import { Bolt, ShieldCheck, Users, Clock } from 'lucide-react'

const reasons = [
  {
    icon: <Bolt size={28} />,
    title: 'Real-Time Action',
    description: 'Everything in Movira happens in real-time — Sparks expire quickly, creating urgency and momentum.',
  },
  {
    icon: <Users size={28} />,
    title: 'Community-Powered',
    description: 'Movira is built on people helping people. Trust and reputation are earned, not bought.',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Reputation System',
    description: 'Every action you take builds your trust level — making you more visible and valuable.',
  },
  {
    icon: <Clock size={28} />,
    title: 'No Time Wasters',
    description: 'Forget ghosting. When a Spark is dropped, help arrives fast or it fades — that’s the rule.',
  },
]

const WhyMovira = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Why Movira?</h2>
      <div className={styles.grid}>
        {reasons.map((item, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.icon}>{item.icon}</div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WhyMovira
