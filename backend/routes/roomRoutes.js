import express from "express";
import {
  createRoom,
  joinRoom,
  submitVote,
  getResults
} from "../controllers/roomController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validationMiddleware from "../middleware/validateMiddleware.js";
import { createRoomSchema } from "../middleware/roomValidations.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  validationMiddleware(createRoomSchema),
  createRoom
);
router.post("/join", joinRoom);
router.post("/vote", submitVote);
router.get("/results/:roomId", authMiddleware, getResults);

export default router;
