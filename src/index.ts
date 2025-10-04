import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello KwicPic");
});
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
