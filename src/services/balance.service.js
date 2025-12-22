import Balance from "../models/Balance.model.js";

export const updateBalances = async (payerId, calculatedSplits) => {
  for (const split of calculatedSplits) {
    if (split.userId.toString() === payerId.toString()) continue;

    const existing = await Balance.findOne({
      fromUser: split.userId,
      toUser: payerId,
    });

    if (existing) {
      existing.amount += split.amount;
      await existing.save();
    } else {
      await Balance.create({
        fromUser: split.userId,
        toUser: payerId,
        amount: split.amount,
      });
    }
  }
};


export const simplifyBalances = (balances, userId) => {
  const youOwe = [];
  const youAreOwed = [];

  for (const b of balances) {
    if (b.fromUser._id.toString() === userId) {
      youOwe.push({
        to: b.toUser,
        amount: b.amount
      });
    } else if (b.toUser._id.toString() === userId) {
      youAreOwed.push({
        from: b.fromUser,
        amount: b.amount
      });
    }
  }

  return { youOwe, youAreOwed };
};
