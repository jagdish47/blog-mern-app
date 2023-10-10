import bcrypt from "bcrypt";
import User from "../model/user.js";

export const SingupUser = async (request, response) => {
  try {
    // const salt = await bcrypt.genSalt(); //generate salt but now no need

    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    //here 10 is salt it automatically generate salf for us

    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword,
    };

    const newUser = new User(user);
    await newUser.save();
    return response.status(200).json({ msg: "signup successfully" });
  } catch (error) {
    console.log("Error while signup user", error.message);
    return response.status(500).json({ msg: "error while signup user" });
  }
};
