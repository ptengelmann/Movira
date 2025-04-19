import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import AuthFormLayout from '../components/auth/AuthFormLayout'

const LoginPage = () => {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form)
      if (res.data.success) {
        setUser({
          user: res.data.data,
          token: res.data.data.token,
        })
        localStorage.setItem('token', res.data.data.token)
        navigate('/dashboard')
      }
    } catch (err) {
      alert('Login failed. Check your email or password.')
      console.error(err)
    }
  }

  return (
    <AuthFormLayout title="Login to Movira">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
          placeholder="Your password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ padding: '12px', fontWeight: 'bold', background: 'var(--pulse-coral)', color: 'white', borderRadius: '8px', border: 'none' }}>
          Log In
        </button>
      </form>
    </AuthFormLayout>
  )
}

export default LoginPage
