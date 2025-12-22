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
app.get('/test', (req, res) => {
  res.send(`
    <h2 style="
      color: red;
      font-size: 40px;
      font-family: Arial, sans-serif;
      text-align: center;
      background-color: #ffe6e6;
      padding: 15px;
      border: 2px solid red;
      border-radius: 8px;
    ">
      Styled Red Heading
    </h2>
  `);
});


export default app;
