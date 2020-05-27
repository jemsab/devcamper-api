const express = require('express')
const advancedResults = require('../middleware/advancedResults')
const { protect, authorize } = require('../middleware/auth')
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
const reviewRouter = require('./reviews')

const router = express.Router({ mergeParams: true })

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)
router.use('/:bootcampId/reviews', reviewRouter)

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp)
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp)
router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload)
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

module.exports = router
