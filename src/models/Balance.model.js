import mongoose from "mongoose";

const balanceSchema = new mongoose.Schema(
  {
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Balance", balanceSchema);
