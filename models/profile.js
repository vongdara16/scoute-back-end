import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  email: {type: String, required: true, lowercase: true, unique: true},
  name: String,
  avatar: String,
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
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  },
},{
    timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export {Profile}
