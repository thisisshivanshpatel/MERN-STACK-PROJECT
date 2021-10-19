const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../DB/models/userSchema");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootuser);
});

router.get("/about", authenticate, (req, res) => {
  res.send(req.rootuser);
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res
      .status(422)
      .json({ error: "please fill all the filled properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    } else if (password != cpassword) {
      return res
        .status(422)
        .json({ error: "password and confirm password are not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      await user.save();

      const token = await user.generateAuthToken();

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      res.status(201).json({ message: "user registered sucessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  //   2 email,from email id
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Plz filled the data" });
    }

    const userLogin = await User.findOne({ email: email });

    if (!userLogin) {
      res.status(400).json({ error: "email id is not registered" });
    }

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "email or password not matched" });
      } else {
        const token = await userLogin.generateAuthToken();

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.json({ message: "Login sucessfull" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout sucessfully");
});

module.exports = router;
