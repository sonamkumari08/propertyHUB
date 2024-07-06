 if(process.env.NODE_ENV != "production") {
  require('dotenv').config();
}
console.log(process.env.SECRET);


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");
const session = require("express-session");
const MongoStore = require ("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const wrapAsync = require("./utils/wrapAsyc.js");
const listings = require("./routes/listing.js");
const review = require("./routes/review.js");
const userRouter = require("./routes/user.js");





 
 
 const MONGO_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect( MONGO_URL);
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7*24 * 60 * 60* 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};


// app.get("/", (req, res) => {
//  res.send("Hi, I am root");
//});


const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600.
})

store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.success = req.flash("sucess");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});


app.use("/listings", listings);
app.use("/listings/:id/reviews",review);
app.use("/", userRouter);

/*app.get("/demouser",async (req, res) => {
  let fakeUser = new User({
    email: "student@gmail.com",
    username: "delta-student"
  });
   let registerdUser = await User. register(fakeUser, "helloworld");
  res.send(registerdUser);
});*/

app.all("*",(req, res, next) => {
  next(new ExpressError(404, "page Not Found!"));
});

app.use((err, req, res, next) =>  {
  let {statusCode =500, message="something went wrong!"} = err;
  res.status(statusCode).render ("error.ejs", {message});
 // res.status(statusCode).send(message);
} );


app.listen(property-hub-euly.vercel.app
, () => {
  console.log("server is listening to port 8080");
});
