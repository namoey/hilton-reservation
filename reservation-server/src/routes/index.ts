import { Router } from "express"
import { getReservations, addReservation, updateReservation, deleteReservation } from "../controllers/reservations"
import { getUsers, addUser, updateUser, deleteUser, userLogin } from "../controllers/users"
import { getMetrics } from "../controllers/prometheus"

const router: Router = Router()
router.get("/reservation/list", getReservations)
router.post("/reservation/add", addReservation)
router.put("/reservation/:id", updateReservation)
router.delete("/reservation/:id/", deleteReservation)

router.get("/user/list", getUsers)
router.post("/user/add", addUser)
router.put("/user/:id", updateUser)
router.delete("/user/:id/", deleteUser)
router.post("/user/login", userLogin)

router.get('/metrics', getMetrics)

export default router;