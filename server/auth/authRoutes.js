const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("./user");
const router = express.Router();
const authenticateToken = require("./Middleware/authenticateToken");
// Register User
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

// Login User
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    }); // 1 hour expiry

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/getUser", authenticateToken, (req, res) => {
  // Access user ID and email from the request object
  const userId = req.user.id;

  res.send({ userId });
  // Rest of your route logic
});
module.exports = router;
