const express = require('express')
const router = express.Router()
const { createSpark } = require('../controllers/sparkController')

router.post('/', createSpark)

module.exports = router
