import { Router } from "express";
import * as restaurantsCtrl from '../controllers/restaurants.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth";

const router = Router()

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

router.get('/restaurants', checkAuth, restaurantsCtrl.index)

router.get('/restaurants/:id', checkAuth, restaurantsCtrl.show)

router.post('/restaurants', checkAuth, restaurantsCtrl.create)

router.put('/restaurants/:id', checkAuth, restaurantsCtrl.update)

router.delete('/restaurants/:id', checkAuth, restaurantsCtrl.delete)

export {
  router
}