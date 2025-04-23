const Spark = require('../models/Spark')
const User = require('../models/User')

// POST /api/sparks
const createSpark = async (req, res) => {
  try {
    const { title, description, tag, urgency, reward, userId, xpBoost } = req.body

    if (!title || !description || !userId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' })
    }

    let xpToAdd = 1
    if (xpBoost) xpToAdd = 3

    const newSpark = new Spark({
      title,
      description,
      tag,
      urgency,
      reward,
      userId,
      xpBoost: !!xpBoost,
    })

    await newSpark.save()

    // Update user's XP
    const user = await User.findById(userId)
    user.xp += xpToAdd
    await user.save()

    res.status(201).json({ success: true, data: newSpark, user })
  } catch (err) {
    console.error('Spark creation failed:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

module.exports = { createSpark }
