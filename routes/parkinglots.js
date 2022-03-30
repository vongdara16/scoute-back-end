import { Router } from "express";
import * as parkinglotsCtrl from '../controllers/parkinglots.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router()

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

router.get('/:search', checkAuth, parkinglotsCtrl.index)

router.get('/:id', checkAuth, parkinglotsCtrl.show)

router.post('/', checkAuth, parkinglotsCtrl.create)

router.put('/:id/edit', checkAuth, parkinglotsCtrl.update)

router.delete('/:id', checkAuth, parkinglotsCtrl.delete)

export {
  router
}