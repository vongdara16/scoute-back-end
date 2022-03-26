import { Router } from "express";
import * as restaurantsCtrl from '../controllers/restaurants.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router()

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

router.get('/', checkAuth, restaurantsCtrl.index)

router.get('/:id', checkAuth, restaurantsCtrl.show)

router.post('/', checkAuth, restaurantsCtrl.create)

router.put('/:id', checkAuth, restaurantsCtrl.update)

router.delete('/:id', checkAuth, restaurantsCtrl.delete)

export {
  router
}