const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require('bcrypt')


//@router     GET /auth/google
//@desc       Auth with Google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//@route    GET /auth/google/callback
//@desc     Google auth callback(success)
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

router.post("/signup", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  try {
    const user = await User.create({
        ...req.body,
        password: hashedPass,
    })
    req.login(user, function(err) {
      if (err) { return res.send("Server Error");; }
      res.redirect('/dashboard');
    });
  } catch (error) {
    res.send("Server Error");
  }
})

router.post("/signin", passport.authenticate('local', {
  failureRedirect: '/',
  successRedirect: '/dashboard'
}))

router.post("/login", (req, res) => {
  res.send("/")
})

//@route    GET /auth/logout
//@desc     Logout User
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
