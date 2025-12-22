export const calculateSplit = (amount, splitType, splits, groupMembers) => {
  switch (splitType) {
    case "EQUAL":
      const perHead = amount / groupMembers.length;
      return groupMembers.map((id) => ({
        userId: id,
        amount: parseFloat(perHead.toFixed(2)),
      }));

    case "EXACT":
      const totalExact = splits.reduce((sum, s) => sum + s.amount, 0);
      if (totalExact !== amount) throw new Error("Exact amounts mismatch");
      return splits;

    case "PERCENT":
      const totalPercent = splits.reduce((sum, s) => sum + s.percent, 0);
      if (totalPercent !== 100) throw new Error("Percent must be 100");

      return splits.map((s) => ({
        userId: s.userId,
        amount: parseFloat(((s.percent / 100) * amount).toFixed(2)),
      }));

    default:
      throw new Error("Invalid split type");
  }
};
