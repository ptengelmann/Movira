const Spark = require('../models/Spark')

// POST /api/sparks
const createSpark = async (req, res) => {
  try {
    const { title, description, tag, urgency, reward } = req.body

    const newSpark = new Spark({ title, description, tag, urgency, reward })
    await newSpark.save()

    res.status(201).json({ success: true, data: newSpark })
  } catch (err) {
    console.error('Spark creation failed:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

module.exports = {
  createSpark,
}
