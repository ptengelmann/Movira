import React from 'react'
import styles from './HowItWorks.module.css'
import { Sparkles, MessageCircle, ShieldCheck, TrendingUp } from 'lucide-react'

const steps = [
  {
    icon: <Sparkles size={24} />,
    title: 'Drop a Spark',
    description: 'Ask for help, share a challenge, or request something you need done — fast.',
  },
  {
    icon: <MessageCircle size={24} />,
    title: 'Get Real-Time Replies',
    description: 'People reply instantly with solutions, offers, or support. You choose who to engage with.',
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'Earn XP & Level Up',
    description: 'Helping others earns XP. The more you show up and deliver, the higher your rank.',
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Build Trust',
    description: 'As your XP grows, so does your trust level. Verified users get visibility and rewards.',
  },
]

const HowItWorks = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>How Movira Works</h2>
        <p className={styles.subtext}>In four steps, you go from asking to earning — in real time.</p>
        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <div className={styles.stepCard} key={index}>
              <div className={styles.icon}>{step.icon}</div>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.desc}>{step.description}</p>
              <span className={styles.stepNumber}>{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
