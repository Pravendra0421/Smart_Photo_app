import express from "express";
import { configDotenv } from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/route.js";
import OnbordingRoute from "./routes/OnboardingRoute.js";
import UserRoute from "./routes/userRoute.js";
import CreateGroupRoute from "./routes/createGroupRoute.js";
import GroupMembershipRoute from "./routes/groupMembership.js";
import UploadImageRoute from "./routes/uploadImageRoute.js";
import ShareDetail from "./routes/GroupShareDetail.js";
import "../lib/firebaseAdmin.js";
configDotenv();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(bodyParser.json());
app.use("/api", router);
app.use("/api/onboarding", OnbordingRoute);
app.use("/api/user", UserRoute);
app.use("/api/Group", CreateGroupRoute);
app.use("/api/groupmembership", GroupMembershipRoute);
app.use("/api/upload", UploadImageRoute);
app.use("/api/share-detail", ShareDetail);
app.get("/", (req, res) => {
  res.send("Hello KwicPic");
});
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
