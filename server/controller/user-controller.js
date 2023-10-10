import User from "../model/user.js";

export const SingupUser = async (request, response) => {
  try {
    const user = request.body;
    const newUser = new User(user);
    await newUser.save();
    return response.status(200).json({ message: "signup successfully" });
  } catch (error) {
    console.log("Error while signup user", error.message);
    return response.status(500).json({ message: "error while signup user" });
  }
};
