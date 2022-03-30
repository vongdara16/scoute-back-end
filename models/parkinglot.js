import mongoose from "mongoose"

const parkingSchema = new mongoose.Schema({
  author: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "Profile"
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  isSafe: {
    type: Boolean,
    required: true,
  },
  isFree: {
    type: Boolean,
    required: true,
  },
  isPaved: {
    type: Boolean,
    required: true
  },
  lightQuality: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  cleanliness: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  isCovered: {
    type: Boolean,
    required: true,
  },
  photo: {
    type: String
  },
  review: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "Review"
  },
})

const Parking = mongoose.model('Parking', parkingSchema)

export { Parking }