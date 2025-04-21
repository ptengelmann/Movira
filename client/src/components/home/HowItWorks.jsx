import React from 'react'
import styles from './HowItWorks.module.css'
import { Sparkles, MessageCircle, TrendingUp, ShieldCheck } from 'lucide-react'

const steps = [
  {
    icon: <Sparkles size={28} />,
    title: 'Drop a Spark',
    description: 'Ask for help, share a challenge, or request something you need done — fast.',
  },
  {
    icon: <MessageCircle size={28} />,
    title: 'Get Real-Time Replies',
    description: 'People reply instantly with solutions, offers, or support. You choose who to engage with.',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Earn XP & Level Up',
    description: 'Helping others earns XP. The more you show up and deliver, the higher your rank.',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Build Trust',
    description: 'As your XP grows, so does your trust level. Verified users get visibility and rewards.',
  },
]

const HowItWorks = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>How Movira Works</h2>
        <p className={styles.subtext}>From spark to trust in just four steps.</p>
        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.iconWrapper}>
                {step.icon}
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
              {index < steps.length - 1 && <div className={styles.connector} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
