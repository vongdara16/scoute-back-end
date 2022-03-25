import { Parking } from '../models/parking.js'
import { Review } from '../models/review.js'

function index (req, res) {
  Parking.find({})
  .then(parkinglot => {
    res.json(parkinglot)
  })
  .catch(err => {
    res.json
  })
}

function create (req, res) {
  req.body.author = req.user.profile
  Parking.create(req.body)
  .then(parkinglot => {
    parkinglot.populate('author')
  })
  .catch(err => {
    res.json(err)
  })
}

function deleteParking(req, res) {
  Parking.findByIdAndDelete(req.params.id)
  .then(parkinglot => res.json(parkinglot))
  .catch(err => res.json(err))
}

function update(req, res) {
  Parking.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(parkinglot => res.json(parkinglot))
  .catch(err => res.json(err))
}

function show(req, res) {
  Parking.findById(req.params.id)
  .then(Review.find({_id}))
  .then(parkinglot => res.json(parkinglot))
  .catch(err => res.json(err))
}

export {
  index,
  create,
  deleteParking as delete,
  update,
  show
}