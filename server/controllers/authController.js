const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

const signup = async (req, res) => {
    try {
      const { name, email, password } = req.body
  
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
      }
  
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' })
      }
  
      const newUser = new User({
        name,
        email,
        password, // will be hashed by Mongoose pre-save
        xp: 0,
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
