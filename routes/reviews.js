import { Router } from "express"
import * as reviewsCtrl from '../controllers/reviews.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"

const router = Router()

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

router.post('/restaurants/:id', checkAuth, reviewsCtrl.create)
router.post('/restrooms/:id', checkAuth, reviewsCtrl.create)
router.post('/parkinglots/:id', checkAuth, reviewsCtrl.create)

router.put('/restaurants/:id/reviews/:reviewId', checkAuth, reviewsCtrl.update)
router.put('/restrooms/:id/reviews/:reviewId', checkAuth, reviewsCtrl.update)
router.put('/parkinglots/:id/reviews/:reviewId', checkAuth, reviewsCtrl.update)

router.delete('/restaurants/:id/reviews/:reviewId', checkAuth, reviewsCtrl.delete)
router.delete('/restrooms/:id/reviews/:reviewId', checkAuth, reviewsCtrl.delete)
router.delete('/parkinglots/:id/reviews/:reviewId', checkAuth, reviewsCtrl.delete)

export {
  router
}