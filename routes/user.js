const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
//const { route } = require("./listing.js");
const { saveRedirectUrl } = require("../middleware.js");
const usercontroller = require("../controllers/users.js");
const wrapAsync = require("../utils/wrapAsyc.js");




//Signup page
router.get("/signup", usercontroller.renderSignupForm);
 router.post("/signup", wrapAsync( usercontroller.signup   ));/* async (req, res) => {
    try{
   let {username, email, password} = req.body;
   const newUser = new User({email, username});
   const registerdUser = await User.register(newUser, password);
   console.log(registerdUser);
   req.login(registerdUser, (err) => {
    if(err) {
        return next(err);
    }
    req.flash("success", "Welcome to Wanderlust");
    res.redirect("/listings");

});

} catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
}
}));*/

//Login page

 router.get("/login",usercontroller.renderLogin);  /* (req, res) => {
    res.render("users/login.ejs");
});*/


router.post(
    "/login", 
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
   usercontroller.login
);
/*async (req, res) => {
    req.flash("success", "Welcome to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
   // res.redirect("/listings");
};*/


//logout 
router.get("/logout", usercontroller.logoutform)/* ( req, res) => {
    req.logout((err) => {
        if(err) {
            return next(err);

        }
        req.flash("success", "You are logout!");
        res.redirect("/listings");
    });
}); */




module.exports = router;
