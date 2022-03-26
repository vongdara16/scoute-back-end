import { Router } from "express";
import * as parkinglotsCtrl from '../controllers/parkinglots.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router()

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

router.get('/parkinglots', checkAuth, parkinglotsCtrl.index)

router.get('/parkinglots/:id', checkAuth, parkinglotsCtrl.show)

router.post('/parkinglots', checkAuth, parkinglotsCtrl.create)

router.put('/parkinglots/:id', checkAuth, parkinglotsCtrl.update)

router.delete('/parkinglots/:id', checkAuth, parkinglotsCtrl.delete)

export {
  router
}