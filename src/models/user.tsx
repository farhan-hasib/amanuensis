import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const User = models.User || mongoose.model("User", userSchema);

export default User;
