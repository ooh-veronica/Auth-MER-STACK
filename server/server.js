const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config()


app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/auth");

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      LastLoginAt: new Date(),
    }); 
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.get("/api/users", async (req, res) => {
  User.find({}).then(function (user) {
    res.send(user);
  });
});

app.delete("/api/users", async (req, res) => {
  console.log("req.body", req.body);

  try {
    const deleted = await Promise.all(
      req.body.map(async (id) => await User.deleteOne({ _id: id }))
    );
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Something went wrong" });
  }
});

app.put("/api/users/block", async (req, res) => {
  const ids = req.body;

  await User.updateMany({ _id: { $in: ids } }, { isBlocked: true });
  const users = await User.find({})
  res.json(users)
});

app.put("/api/users/unblock", async (req, res) => {
  const ids = req.body;

  await User.updateMany({ _id: { $in: ids } }, { isBlocked: false });
  const users = await User.find({})
  res.json(users)
});

app.listen(1337, () => {
  console.log("Server started on 1337");
});
