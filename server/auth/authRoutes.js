const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("./user");
const router = express.Router();
const authenticateToken = require("./Middleware/authenticateToken");
const Employe = require("../modles/Employe");

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .send({ message: "User created successfully", authToken: token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Employe.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email" });
    } else if (!(await user.comparePassword(req.body.password))) {
      return res.status(401).send({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.EmployeID }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "strict",
    //   maxAge: 3600000,
    // });

    res.status(200).send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
router.get("/getUser", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const nowUser = await User.findOne({ id: userId });
    res.send({ nowUser });
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/getUsers", async (req, res) => {
  try {
    const nowUsers = await User.find();
    res.send({ nowUsers });
  } catch (error) {
    res.status(500).send(error);
  }
});
router.delete("/getUsers", async (req, res) => {
  try {
    const nowUsers = await User.deleteMany({});
    res.send({ msg: "users deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
