import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import AuthFormLayout from '../components/auth/AuthFormLayout'
import styles from './SignupPage.module.css'
import { UserPlus, HeartHandshake } from 'lucide-react'

const SignupPage = () => {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '', // ✅ include role
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRoleSelect = (role) => {
    setForm({ ...form, role })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form)
      if (res.data.success) {
        setUser({
          user: res.data.data,
          token: res.data.data.token,
        })
        localStorage.setItem('token', res.data.data.token)
        navigate('/dashboard')
      }
    } catch (err) {
      console.error(err)
      alert('Signup failed. Try again.')
    }
  }

  return (
    <AuthFormLayout title="Create an Account">
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <div>
          <label><strong>Select your role:</strong></label>
          <div className={styles.roleSelection}>
            <div
              className={`${styles.roleCard} ${form.role === 'dropper' ? styles.selected : ''}`}
              onClick={() => handleRoleSelect('dropper')}
            >
              <UserPlus size={28} />
              <div className={styles.roleTitle}>Dropper</div>
              <div className={styles.roleDesc}>Need help with something? Drop a Spark and get fast support.</div>
            </div>

            <div
              className={`${styles.roleCard} ${form.role === 'responder' ? styles.selected : ''}`}
              onClick={() => handleRoleSelect('responder')}
            >
              <HeartHandshake size={28} />
              <div className={styles.roleTitle}>Responder</div>
              <div className={styles.roleDesc}>Want to help others and earn trust? Become a Responder.</div>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>Sign Up</button>
      </form>
    </AuthFormLayout>
  )
}

export default SignupPage
