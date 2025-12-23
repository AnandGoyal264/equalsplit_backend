import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { addExpense ,getGroupExpenses} from "../controllers/expense.controller.js";

const router = Router();
router.get("/groups/:groupId", auth ,getGroupExpenses );
router.post("/", auth, addExpense);

export default router;
