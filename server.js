const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./Routs/UserRouts/userrout");
const Post = require("./Routs/PostRouts/PostRouter");
const AuthUser = require("./Routs/UserRouts/AuthUser");

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false); // Set the strictQuery option to false

mongoose
  .connect("mongodb://127.0.0.1:27017/Social_netWork", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("Unable to connect to DB", error);
  });

app.use("/api/user", userRouter);
app.use("/api/AuthUser", AuthUser);
app.use("/api/post", Post);

app.listen(port, () =>
  console.log(`Social media Project is running on port: ${port}!`)
);
