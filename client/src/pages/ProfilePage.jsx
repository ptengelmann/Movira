import React from 'react'
import styles from './ProfilePage.module.css'
import useUserStore from '../store/useUserStore'
import { User, Mail, Sparkles, ShieldCheck } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const { user, logout } = useUserStore()
  const navigate = useNavigate()

  const getTrustLevelColor = (level) => {
    switch (level) {
      case 'Verified': return '#00b894'
      case 'Trusted': return '#0984e3'
      case 'Rising': return '#fdcb6e'
      default: return '#d63031'
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return
    try {
      await axios.delete(`http://localhost:5000/api/auth/${user._id}`)
      logout()
      localStorage.removeItem('token')
      navigate('/')
    } catch (err) {
      console.error('Account deletion failed:', err)
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <h2>Welcome, {user?.name || 'User'}</h2>
        <p>Your personal space in Movira</p>
      </div>

      <div className={styles.avatarWrapper}>
  <img
    src={`/assets/default-avatar.png`}
    alt="User Avatar"
    className={styles.avatar}
    onError={(e) => {
      e.currentTarget.src = `/assets/default-avatar.png`
    }}
  />
</div>

      <div className={styles.card}>
        <div className={styles.row}>
          <User size={20} className={styles.icon} />
          <span>{user?.name || '—'}</span>
        </div>

        <div className={styles.row}>
          <Mail size={20} className={styles.icon} />
          <span>{user?.email || '—'}</span>
        </div>

        <div className={styles.row}>
          <Sparkles size={20} className={styles.icon} />
          <span>{user?.xp || 0} XP</span>
        </div>

        <div className={styles.row}>
          <ShieldCheck size={20} className={styles.icon} />
          <span style={{ color: getTrustLevelColor(user?.trustLevel) }}>
            {user?.trustLevel || 'New'}
          </span>
        </div>

        <button className={styles.deleteBtn} onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </div>
  )
}

export default ProfilePage
