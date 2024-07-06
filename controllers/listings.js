
const Listing = require("../models/listing");

 //Index
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  };

//New Route
    module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
  };

  //about 
  module.exports.showabout = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/about.ejs", { listing });
  };

  //mainpage
  module.exports.showMainpage = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/mainpage.ejs", { listing });
  };

// show route
  module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
      path:"reviews",
      popolate: {
        path: "author",
      },
    })
    .populate("owner") ;
    if(!listing) {
      req.flash("error", " Listing you requeted for not exist!");
      res.redirect("/listing");
    }
    
    res.render("listings/show.ejs", { listing });
  };
  module.exports.createListing = async (req, res, next) => {
    const newListing = new Listing(req.body.listing);  
    newListing.owner = req.user._id;
     await newListing.save();
    console.log(listing);
     req.flash("success", "New Listing Created");
     res.redirect("/listings");
   }; 
  
 
 


  //edit 
  module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
      req.flash("error", "Listing is Edited");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  };

  //Update
  module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
   let listing =  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", " Listing Updated!");
    res.redirect(`/listings/${id}`);
  };

  //Delete
  module.exports.distroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "New Listing deleted!");
    res.redirect("/listings");
  };  

  
