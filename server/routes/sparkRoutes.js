const express = require('express')
const router = express.Router()
const Spark = require('../models/Spark')
const User = require('../models/User')


// GET all Sparks
router.get('/', async (req, res) => {
  try {
    const sparks = await Spark.find().sort({ createdAt: -1 })
    res.status(200).json({ success: true, data: sparks })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// GET Sparks by user ID
router.get('/user/:id', async (req, res) => {
  try {
    const sparks = await Spark.find({ userId: req.params.id }).sort({ createdAt: -1 })
    res.status(200).json({ success: true, data: sparks })
  } catch (err) {
    console.error('Fetch user sparks failed:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// POST a new Spark
router.post('/', async (req, res) => {
    try {
      const { title, description, tag, urgency, reward, userId } = req.body
  
      if (!userId) {
        return res.status(400).json({ success: false, message: 'Missing userId' })
      }
  
      const newSpark = new Spark({
        title,
        description,
        tag,
        urgency,
        reward,
        userId,
      })
  
      await newSpark.save()
  
      // ✅ Award XP to user
      const xpGain = 5
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $inc: { xp: xpGain } },
        { new: true }
      )
  
      res.status(201).json({
        success: true,
        data: newSpark,
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          xp: updatedUser.xp,
        },
      })
    } catch (err) {
      console.error('Error creating spark:', err)
      res.status(500).json({ success: false, message: 'Server error' })
    }
  })

// ✅ DELETE a Spark by ID
router.delete('/:id', async (req, res) => {
  try {
    await Spark.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, message: 'Spark deleted' })
  } catch (err) {
    console.error('Delete error:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// POST reply to a Spark
router.post('/:id/reply', async (req, res) => {
    try {
      const { userId, message, username } = req.body
  
      if (!userId || !message) {
        return res.status(400).json({ success: false, message: 'Missing fields' })
      }
  
      const updatedSpark = await Spark.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            replies: {
              userId,
              message,
              username,
              createdAt: new Date(),
            },
          },
        },
        { new: true }
      )
  
      // ✅ Award XP to the replier
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $inc: { xp: 3 } },
        { new: true }
      )
  
      res.status(200).json({
        success: true,
        data: updatedSpark,
        user: updatedUser,
      })
    } catch (err) {
      console.error('Reply failed:', err)
      res.status(500).json({ success: false, message: 'Server error' })
    }
  })
  

module.exports = router
