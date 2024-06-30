const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsyc.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");
//const { validateReview } = require("../middleware.js");
const reviewController = require("../controllers/review.js");
  




//Reviewst
//Post Route
router.post("/", isLoggedIn,
    wrapAsync( reviewController.createReview));/*async (req, res) =>{
      
      let listing = await Listing.findById(req.params.id);
      let newReview = new Review(req.body.review);
      newReview.author = req.user._id;
      listing.reviews.push(newReview);
    console.log(newReview);
      await newReview.save();
      await listing.save();
     console.log("new revies saved");
    //res.send(" new review saved");
    res.redirect(`/listings/${listing._id}`);
    }));
    */


//Delete review

router.delete("/:reviewId", isLoggedIn,  wrapAsync(reviewController.distroyReview)); /*
 wrapAsync, async (req,res) => {
    let {id, reviewId } = req.params;
  
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
   
    res.redirect(`/listings/${id}`);
   } );
*/
module.exports = router;