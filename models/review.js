import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
  author: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "Profile"
  },
  restroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restroom"
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant"
  },
  parking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parking"
  },
  text: {
    type: String,
    required: true,
  }, 
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  yelprestaurant: {
    type: String
  },
  restroomId: {
    type: String
  }
},{
  timestamps: true,
})

const Review = mongoose.model('Review', reviewSchema)

export { Review }