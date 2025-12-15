import { z } from "zod";

export const createRoomSchema = z.object({
  title: z.string().min(1, "Title is required"),
  mode: z.enum(["open", "restricted"]),
  allowedEmails: z.array(z.string().email()).optional(),
});
