import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

import dotenv from "dotenv";

dotenv.config();

const user = process.env.DB_USERNAME;
const pass = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  url: `mongodb+srv://${user}:${pass}@blog-app.sf1ssle.mongodb.net/`,
  options: { useNewUrlParser: true },

  file: (request, file) => {
    const match = ["image/png", "image/jpg"];

    if (match.indexOf(file.memeType) === -1) {
      return `${Date.now()}-blog-${file.originalname}`;
    }
  },
});

export default multer({ storage });
