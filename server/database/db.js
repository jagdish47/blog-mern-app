import mongoose from "mongoose";

export const Connection = async (user, pass) => {
  const URL = `mongodb+srv://${user}:${pass}@blog-app.sf1ssle.mongodb.net/`;

  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error while connection to Database", error.message);
  }
};
