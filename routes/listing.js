const express = require("express");
const router = express.Router();
 
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsyc.js");
const Review = require("../models/review.js");

const { response } = require("express");







router
.route("/")
 .get( wrapAsync(listingController.index))
 .post(
 isLoggedIn, 
  wrapAsync  ( listingController.createListing) ) ;

//New route
  router.get("/new",isLoggedIn, listingController.renderNewForm); 

  //New about
   router.get("/about", wrapAsync(listingController.showabout  ));

  router.get("/mainpage", wrapAsync(listingController.showMainpage  ));
 




router.route("/:id")
.get( wrapAsync(listingController.showListing   ))
.put(
  isLoggedIn, 
    wrapAsync( listingController.updateListing) )

 .delete( isLoggedIn, 
    wrapAsync (listingController.distroyListing   ));
     module.exports = router; 



 //edit 
 router.get("/:id/edit",
  isLoggedIn, wrapAsync( listingController.renderEditForm  )) 


  module.exports = router;
   