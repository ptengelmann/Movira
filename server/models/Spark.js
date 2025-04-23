const mongoose = require('mongoose')

const SparkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String },
    urgency: {
      type: String,
      enum: ['15min', '1hr', '24hr'],
      default: '1hr',
    },
    reward: { type: Number, default: 0 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    xpBoost: { type: Boolean, default: false }, // ✅ NEW FIELD
    replies: [
      {
        userId: String,
        username: String,
        message: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Spark', SparkSchema)
