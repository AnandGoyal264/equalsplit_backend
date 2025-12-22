import Group from "../models/Group.model.js";
import User from "../models/User.model.js";

/**
 * Create Group
 */
export const createGroup = async (req, res) => {
  try {
    const group = await Group.create({
      name: req.body.name,
      createdBy: req.user.id,
      members: [req.user.id],
    });

    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get all groups of logged-in user
 */
export const getMyGroups = async (req, res) => {
  try {
    const groups = await Group.find({
      members: req.user.id,
    }).populate("members", "name email");

    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get single group by ID
 */
export const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate(
      "members",
      "name email"
    );

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // ensure user is a member
    if (!group.members.some((m) => m._id.toString() === req.user.id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Add member to group
 */
export const addMemberToGroup = async (req, res) => {
  try {
    const { email } = req.body;
    const groupId = req.params.groupId;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // only members can add others
    if (!group.members.includes(req.user.id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const userToAdd = await User.findOne({ email });
    if (!userToAdd) {
      return res.status(404).json({ message: "User not found" });
    }

    if (group.members.includes(userToAdd._id)) {
      return res.status(400).json({ message: "User already in group" });
    }

    group.members.push(userToAdd._id);
    await group.save();

    res.json({ message: "Member added successfully", group });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
