const express = require("express");
const mongoose = require("mongoose");

const app = express();

const userSchema = mongoose.Schema({
  email: { type: String },
  name: { type: String },
});

const userModel = mongoose.model("user", userSchema);

app.get("/create-user", async (req, res) => {
  const { email, name } = req.query;
  if (typeof email === "string" && typeof name === "string") {
    await userModel.create({ email, name });
    res.send({ status: true });
  } else {
    res.send({ status: false });
  }
});

app.get("/get-users", async (req, res) => {
  const users = await userModel.find({});
  res.send({ users });
});

app.get("/get-user/:userId", async (req, res) => {
  const { userId } = req.params;
  if (mongoose.isValidObjectId(userId)) {
    const user = await userModel.find({ _id: userId });
    res.send({ user });
  } else {
    res.send({ status: false });
  }
});

app.listen(3000, async () => {
  await mongoose.connect("mongodb://mongodb:27017");
  console.log(`server started on  http://localhost:3000`);
});
