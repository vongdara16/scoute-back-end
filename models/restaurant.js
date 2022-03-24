import mongoose from "mongoose"

const restaurantSchema = new mongoose.Schema({
  name: {
    type:  String,
    required: true,
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
  phoneNumber: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    min: 1,
    max: 4,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  review: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "Review"
  },
  author: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "Profile"
  },
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export { Restaurant }