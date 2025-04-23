const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

// POST /api/auth/signup
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const avatars = [
      'https://i.pravatar.cc/150?img=10',
      'https://i.pravatar.cc/150?img=12',
      'https://i.pravatar.cc/150?img=15',
      'https://i.pravatar.cc/150?img=17',
      'https://i.pravatar.cc/150?img=20',
    ]

    const newUser = new User({
      name,
      email,
      password,
      role,
      xp: 0,
      trustLevel: 'New',
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
    })

    await newUser.save()

    const token = generateToken(newUser._id)

    res.status(201).json({
      success: true,
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        xp: newUser.xp,
        role: newUser.role,
        avatar: newUser.avatar,
        trustLevel: newUser.trustLevel,
        token,
      },
    })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user._id)

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        xp: user.xp,
        role: user.role,
        avatar: user.avatar,
        trustLevel: user.trustLevel,
        token,
      },
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  signup,
  login,
}
