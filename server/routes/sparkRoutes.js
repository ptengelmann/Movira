const express = require('express')
const router = express.Router()
const { createSpark } = require('../controllers/sparkController')
const Spark = require('../models/Spark')
const Spark = require('../models/Spark')


router.get('/', async (req, res) => {
  try {
    const sparks = await Spark.find().sort({ createdAt: -1 }) // newest first
    res.status(200).json({ success: true, data: sparks })
  } catch (err) {
    console.error('Failed to fetch Sparks:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})


router.get('/user/:id', async (req, res) => {
    try {
      const sparks = await Spark.find({ userId: req.params.id }).sort({ createdAt: -1 })
      res.status(200).json({ success: true, data: sparks })
    } catch (err) {
      console.error('Fetch user sparks failed:', err)
      res.status(500).json({ success: false, message: 'Server error' })
    }
  })

router.post('/', createSpark)

module.exports = router
