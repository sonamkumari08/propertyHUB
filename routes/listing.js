const express = require("express");
const router = express.Router();
 
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner} = require("../middleware.js");
const listingController = require("../controllers/listings.js");

//const {storage} = require("../cloudconfig.js");

const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsyc.js");
const Review = require("../models/review.js");
const multer  = require('multer');
const { response } = require("express");
//const upload = multer({ dest: 'uploads/' });






router
.route("/")
 .get( wrapAsync(listingController.index))
 .post(
 isLoggedIn, //upload.single("listing[image ]"),
  wrapAsync  ( listingController.createListing) ) ;



// Set up Multer
const upload = multer({
  dest: './uploads/', // Upload folder
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MB
  },
  fileFilter(req, file, cb) {
    // Only allow certain file types
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG and PNG files are allowed'));
    }
  }
});


router.post('/upload/listings', isLoggedIn, wrapAsync (listingController.createListing),

upload.single('image'), (req, res) => {
  // File uploaded successfully
  res.send(`File uploaded successfully: ${req.file.filename}`);
});







//New about
router.get("/about", wrapAsync(listingController.showabout  ));

  //New route
  router.get("/new",isLoggedIn, listingController.renderNewForm); 

  router.get("/mainpage", wrapAsync(listingController.showMainpage  ));
  router.get("/searchpage", wrapAsync(listingController.showMainpage  ));




router.route("/:id")
.get( wrapAsync(listingController.showListing   ))
.put(
  isLoggedIn, //upload.single("listing[image]"),
    wrapAsync( listingController.updateListing) )

 .delete( isLoggedIn, 
    wrapAsync (listingController.distroyListing   ));
     module.exports = router; 



 //edit 
 router.get("/:id/edit",
  isLoggedIn, wrapAsync( listingController.renderEditForm  )) 


  module.exports = router;
   