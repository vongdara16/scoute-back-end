import mongoose from "mongoose"

const restroomSchema = new mongoose.Schema({
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
  review: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "Review"
  },
  accessible: {
    type: Boolean,
    required: true,
  },
  unisex: {
    type: Boolean,
    required: true,
  },
  changingTable: {
    type: Boolean,
    required: true
  },
  restroomId: {
    type: String
  }
})

const Restroom = mongoose.model('Restroom', restroomSchema)

export { Restroom }