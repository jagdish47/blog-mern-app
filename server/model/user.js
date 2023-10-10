import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true }, // Unique usernames
  password: { type: String, required: true },
});

// Create an index on the username field for faster lookup, guarantee that each username in your database is unique
userSchema.index({ username: 1 }, { unique: true });

const User = model("User", userSchema);

export default User;
