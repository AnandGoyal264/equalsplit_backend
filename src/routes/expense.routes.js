import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { addExpense } from "../controllers/expense.controller.js";

const router = Router();

router.post("/", auth, addExpense);

export default router;
