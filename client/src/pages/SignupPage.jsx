import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import AuthFormLayout from '../components/auth/AuthFormLayout'
import { Rocket, Handshake } from 'lucide-react' // ✅ Icons

const roleOptions = [
  {
    id: 'dropper',
    title: 'Dropper',
    description: 'Post Sparks when you need help or want fast feedback.',
    icon: <Rocket size={24} />,
  },
  {
    id: 'responder',
    title: 'Responder',
    description: 'Respond to Sparks, gain XP, and build reputation.',
    icon: <Handshake size={24} />,
  },
]

const SignupPage = () => {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRoleSelect = (role) => {
    setForm({ ...form, role })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.role) return alert('Please select a role.')
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
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {roleOptions.map((opt) => (
          <div
            key={opt.id}
            onClick={() => handleRoleSelect(opt.id)}
            style={{
              flex: '1 1 48%',
              padding: '18px',
              borderRadius: '12px',
              border: form.role === opt.id ? '3px solid var(--pulse-coral)' : '2px solid #ccc',
              cursor: 'pointer',
              transition: '0.2s',
              background: form.role === opt.id ? 'rgba(255, 107, 107, 0.05)' : '#fafafa',
              boxShadow: form.role === opt.id ? '0 0 0 3px rgba(255, 107, 107, 0.1)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              {opt.icon}
              <h4 style={{ margin: 0, fontSize: '16px', color: '#222' }}>{opt.title}</h4>
            </div>
            <p style={{ fontSize: '14px', color: '#555' }}>{opt.description}</p>
          </div>
        ))}
      </div>

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
        <button
          type="submit"
          style={{
            padding: '12px',
            fontWeight: 'bold',
            background: 'var(--pulse-coral)',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
          }}
        >
          Sign Up
        </button>
      </form>
    </AuthFormLayout>
  )
}

export default SignupPage
