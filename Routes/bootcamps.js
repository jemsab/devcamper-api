const express = require('express')
const advancedResults = require('../middleware/advancedResults')
const Bootcamp = require('../models/Bootcamp')

const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload,
  getBootcampsInRadius
} = require('../controllers/bootcamps')

// Include other resource routers
const courseRouter = require('./courses')

const router = express.Router({ mergeParams: true })

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(createBootcamp)
router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)
router.route('/:id/photo').put(bootcampPhotoUpload)
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

module.exports = router
