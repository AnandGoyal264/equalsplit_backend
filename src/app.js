import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import groupRoutes from "./routes/group.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import balanceRoutes from "./routes/balance.routes.js";

const app = express();

app.use(cors({
  origin: "https://equisplit-puce.vercel.app",
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/balances", balanceRoutes);
app.get('/test',(req,res)=>{
  res.send({'welcome':'user'})
});

export default app;
