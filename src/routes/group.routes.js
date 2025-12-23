import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  createGroup,
  getMyGroups,
  getGroupById,
  addMemberToGroup,
  //getGroupExpenses
} from "../controllers/group.controller.js";

const router = Router();

// create group
router.post("/", auth, createGroup);

// get all groups of logged-in user
router.get("/", auth, getMyGroups);

// get single group details
router.get("/:groupId", auth, getGroupById);
//router.get("/group/:groupId", auth, getGroupExpenses);

// add member to group
router.post("/:groupId/add-member", auth, addMemberToGroup);

export default router;
