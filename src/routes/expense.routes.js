import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { addExpense ,getGroupExpenses} from "../controllers/expense.controller.js";

const router = Router();
router.post("/", auth, addExpense);
router.get("/groups/:groupId", auth ,(req,res)=>{
    console.log("atleast request is coming")
    getGroupExpenses});


export default router;
