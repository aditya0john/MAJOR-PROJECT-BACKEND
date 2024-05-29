import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  userName: { type: String },
  email: { type: String },
  image: { type: String },
});

export const Users = models.Users || model("Users", userSchema);
