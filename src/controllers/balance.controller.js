import Balance from "../models/Balance.model.js";
import { simplifyBalances } from "../services/balance.service.js";

export const getMyBalances = async (req, res) => {
  try {
    const userId = req.user.id;

    const balances = await Balance.find({
      $or: [{ fromUser: userId }, { toUser: userId }]
    }).populate("fromUser toUser", "name email");

    const simplified = simplifyBalances(balances, userId);

    res.json(simplified);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const settleBalance = async (req, res) => {
  try {
    const fromUser = req.user.id;
    const { toUserId, amount } = req.body;

    const balance = await Balance.findOne({
      fromUser,
      toUser: toUserId
    });

    if (!balance) return res.status(404).json({ message: "No balance found" });

    if (amount > balance.amount) {
      return res.status(400).json({ message: "Overpayment not allowed" });
    }

    balance.amount -= amount;

    if (balance.amount === 0) {
      await balance.deleteOne();
    } else {
      await balance.save();
    }

    res.json({ message: "Settlement successful" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
