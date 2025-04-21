const express = require('express')
const router = express.Router()
const { signup, login } = require('../controllers/authController')
const User = require('../models/User') // ✅ Add this

router.post('/signup', signup)
router.post('/login', login)

// ✅ DELETE user account
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, message: 'User deleted' })
  } catch (err) {
    console.error('User deletion error:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

module.exports = router
