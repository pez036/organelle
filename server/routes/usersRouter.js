const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const uuidv1 = require("uuidv1")
const User = require("../models/userModel");
const Request = require("../models/resetRequestModel");
const nodemailer = require("nodemailer");
const sendResetEmail = require("../utils/sendResetEmail");

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    // validate

    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
      emailSetting: false,
      autoSyncSetting: false,
      courses: []
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
    console.log("registered");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/updateemailsetting", auth, async (req, res) => {
  try{
    await User.findByIdAndUpdate(req.user, {emailSetting: req.body.emailSetting});
    res.json("email setting updated to "+ req.body.emailSetting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/updatesyncsetting", auth, async (req, res) => {
  try{
    await User.findByIdAndUpdate(req.user, {autoSyncSetting: req.body.autoSyncSetting});
    res.json("auto-sync setting updated to "+ req.body.autoSyncSetting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/updateemail", auth, async (req, res) => {
  try{
    const newEmail = await User.findOne({email: req.body.email});
    if (newEmail) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }
    await User.findByIdAndUpdate(req.user, {email: req.body.email});
    res.json("email updated to "+ req.body.email);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/updatepassword", auth, async (req, res) => {
  try {
    const password = req.body.password;
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(req.user, {password: passwordHash});
    res.json("password updated to "+ password);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});

router.get("/setting", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    email: user.email,
    displayName: user.displayName,
    emailSetting: user.emailSetting,
    autoSyncSetting: user.autoSyncSetting
  });
});

router.post('/forgot', async (req, res) => {
  const user = await User.findOne({"email": req.body.email});
  if (user) {
    const id = uuidv1();
    const request = {
      uuid: id,
      email: user.email
    }
    //create a request ticket
    const newRequest = new Request(request);
    const savedRequest = await newRequest.save();
    //send the reset email
    sendResetEmail(req.body.email, id);
  }
  res.status(200).json({msg:"reset link sent!"});
});

router.post("/reset", async (req, res) => {
  try {
    const {password, passwordCheck, id} = req.body;
    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." })
    }
    const request = await Request.findOne({"uuid":id});
    if (request) {
      const user = await User.findOne({"email": request.email});
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      await User.findByIdAndUpdate(user._id, {password: passwordHash});
      res.status(204).json("reset password successfully");
      await Request.findOneAndDelete({"uuid":id});
    } else {
      res.status(404).json("invalid request");
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
