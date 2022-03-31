import { Router } from "express";
import * as restaurantsCtrl from '../controllers/restaurants.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router()

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

router.get('/:search', checkAuth, restaurantsCtrl.getAll)

router.get('/:lat/:lng', checkAuth, restaurantsCtrl.getAllByGeo)

router.get('/:id', checkAuth, restaurantsCtrl.show)

router.post('/', checkAuth, restaurantsCtrl.create)

export {
  router
}