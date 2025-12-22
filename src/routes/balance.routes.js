import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { getMyBalances, settleBalance } from "../controllers/balance.controller.js";

const router = Router();

router.get("/", auth, getMyBalances);
router.post("/settle", auth, settleBalance);

export default router;
