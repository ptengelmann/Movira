import React from 'react'
import useUserStore from '../store/useUserStore'
import styles from './DashboardPage.module.css'
import StatsWidget from '../components/dashboard/StatsWidget'
import { Sparkles, TrendingUp, MessageCircle } from 'lucide-react'
import ProgressWidget from '../components/dashboard/ProgressWidget'
import XPBadge from '../components/dashboard/XPBadge'

const DashboardPage = () => {
  const { user } = useUserStore()

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>👋 Welcome back, {user?.name}</h1>
        <p className={styles.description}>
          You have <strong>{user?.xp || 0} XP</strong> — keep building your badge and reputation!
        </p>

        <div className={styles.statsRow}>
          <StatsWidget label="XP" value={user?.xp || 0} icon={<Sparkles />} />
          <StatsWidget label="Badge" value={<XPBadge xp={user?.xp || 0} />} icon={<TrendingUp />} />
        </div>

        <ProgressWidget currentXP={user?.xp || 0} />

        {user?.role === 'dropper' && (
          <div className={styles.roleCardDropper}>
            <MessageCircle size={20} />
            <div>
              <strong>Your Role: Dropper</strong>
              <p>
                Post Sparks when you need help. Helpers send private applications with proposals.
              </p>
            </div>
          </div>
        )}

        {user?.role === 'responder' && (
          <div className={styles.roleCardResponder}>
            <MessageCircle size={20} />
            <div>
              <strong>Your Role: Responder</strong>
              <p>
                Head to <strong>Explore</strong> to apply to Sparks and earn XP.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
