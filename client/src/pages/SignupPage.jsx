import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/useUserStore'

const SignupPage = () => {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
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
        navigate('/dashboard') // redirect on success
      }
    } catch (err) {
      console.error(err)
      alert('Signup failed. Try again.')
    }
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '40px 20px' }}>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignupPage
