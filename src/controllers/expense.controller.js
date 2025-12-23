import Expense from "../models/Expense.model.js";
import Group from "../models/Group.model.js";
import { calculateSplit } from "../services/split.service.js";
import { updateBalances } from "../services/balance.service.js";


export const getGroupExpenses = async (req, res) => {
  
  try {
    const { groupId } = req.params;

    console.log("✅ request is coming");
    console.log("groupId:", groupId);

    const expenses = await Expense.find({ groupId })
      .populate("paidBy", "name email")
      .sort({ createdAt: -1 });

    console.log("expenses found:", expenses.length);

    res.json(expenses);
  } catch (err) {
    console.error("❌ getGroupExpenses error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const addExpense = async (req, res) => {
  try {
    const { groupId, amount, description, splitType, splits } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (!group.members.includes(req.user.id)) {
      return res.status(403).json({ message: "Not a group member" });
    }

    // calculate split
    const calculatedSplits = calculateSplit(
      amount,
      splitType,
      splits,
      group.members
    );

    const expense = await Expense.create({
      groupId,
      paidBy: req.user.id,
      amount,
      description,
      splitType,
      splits: calculatedSplits,
    });

    // update balance ledger
    await updateBalances(req.user.id, calculatedSplits);

    res.json({
      message: "Expense added",
      expense,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
