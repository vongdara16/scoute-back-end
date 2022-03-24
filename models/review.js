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
  content: {
    type: String,
    required: true,
  }, 
  rating: {
    type: Number,
  },
},{
  timestamps: true,
})

const Review = mongoose.model('Review', reviewSchema)

export { Review }