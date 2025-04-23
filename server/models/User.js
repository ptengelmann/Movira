const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    xp: {
      type: Number,
      default: 0,
    },
    role: {
        type: String,
        enum: ['dropper', 'responder'],
        required: true,
      },
    trustLevel: {
        type: String,
        enum: ['New', 'Rising', 'Trusted', 'Verified'],
        default: 'New',
      },
      avatar: {
        type: String,
        default: '', // We’ll assign a default at signup
      },
  },
  { timestamps: true }
)

// ✅ This is the missing part — hashes password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

module.exports = mongoose.model('User', UserSchema)
