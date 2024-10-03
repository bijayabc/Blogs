const express = require('express')
const blogController = require('../controllers/blogControllers')

const router = express.Router()

router.get('/blogs', blogController.blog_index)

module.exports = router