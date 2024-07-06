const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsyc.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");
const { validateReview } = require("../middleware.js");
const reviewController = require("../controllers/review.js");
  



//Reviews
//Post Route
router.post("/", isLoggedIn, validateReview, isReviewAuthor,
    wrapAsync( reviewController.createReview));
      
//Delete review

router.delete("/:reviewId", isLoggedIn,  wrapAsync(reviewController.distroyReview)); 

module.exports = router;