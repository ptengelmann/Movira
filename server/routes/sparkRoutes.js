const express = require('express')
const router = express.Router()
const Spark = require('../models/Spark')

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
      console.log('Creating spark:', req.body)
  
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
  
      res.status(201).json({ success: true, data: newSpark })
    } catch (err) {
      console.error('Error creating spark:', err)
      res.status(500).json({ success: false, message: 'Server error' })
    }
  })

module.exports = router
