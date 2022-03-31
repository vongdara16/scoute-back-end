import { Router } from "express"
import * as reviewsCtrl from '../controllers/reviews.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"

const router = Router()

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

router.get('/restrooms/:restroomId', checkAuth, reviewsCtrl.getRestroomReviews)
router.get('/:restaurantId', checkAuth, reviewsCtrl.getRestaurantReviews)

router.post('/', checkAuth, reviewsCtrl.create)

router.delete('/:reviewId', checkAuth, reviewsCtrl.delete)

export {
  router
}