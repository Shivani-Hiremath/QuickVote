import mongoose from "mongoose";
import { z } from "zod";

votes: [
  {
    voterId: {
      type: String,
      required: true
    },
    choice: {
      type: String,
      required: true
    }
  }
]

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  mode: {
    type: String,
    enum: ["open", "restricted"],
    required: true
  },

  allowedEmails: {
    type: [String],
    default: []
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

export default mongoose.model("Room", roomSchema);
