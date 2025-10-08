import express from "express";
import { configDotenv } from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/route.js";
import OnbordingRoute from "./routes/OnboardingRoute.js";
configDotenv();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(bodyParser.json());
app.use("/api", router);
app.use("/api/onboarding", OnbordingRoute);
app.get("/", (req, res) => {
  res.send("Hello KwicPic");
});
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
