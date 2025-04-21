const Spark = require('../models/Spark')

// POST /api/sparks
const createSpark = async (req, res) => {
  try {
    const { title, description, tag, urgency, reward, userId } = req.body

    if (!title || !description || !userId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' })
    }

    const newSpark = new Spark({
      title,
      description,
      tag,
      urgency,
      reward,
      userId, // ✅ Include the userId for reference
    })

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
