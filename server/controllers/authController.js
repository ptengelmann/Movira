const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

// POST /api/auth/signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const newUser = new User({ name, email, password })
    await newUser.save()

    const token = generateToken(newUser._id)

    res.status(201).json({
      success: true,
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        xp: newUser.xp,
        token,
      },
    })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { signup }
