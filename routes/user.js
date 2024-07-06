const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usercontroller = require("../controllers/users.js");
const wrapAsync = require("../utils/wrapAsyc.js");




//Signup page
 router.get("/signup", usercontroller.renderSignupForm);
 router.post("/signup", wrapAsync( usercontroller.signup   ));
 
 //Login page
 router.get("/login",usercontroller.renderLogin);
 router.post(
    "/login", 
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
   usercontroller.login
);
//logout 
router.get("/logout", usercontroller.logoutform)



module.exports = router;
