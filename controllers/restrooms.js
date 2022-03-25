import { Restroom } from '../models/restroom.js'
import { Review } from '../models/review.js'

function index (req, res) {
  Restroom.find({})
  .then(restrooms => {
    res.json(restrooms)
  })
  .catch(err => {
    res.json
  })
}

function create (req, res) {
  req.body.author = req.user.profile
  Restroom.create(req.body)
  .then(restroom => {
    restroom.populate('author')
  })
  .catch(err => {
    res.json(err)
  })
}

function deleteRestroom(req, res) {
  Restroom.findByIdAndDelete(req.params.id)
  .then(restroom => res.json(restroom))
  .catch(err => res.json(err))
}

function update(req, res) {
  Restroom.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(restroom => res.json(restroom))
  .catch(err => res.json(err))
}

function show(req, res) {
  Restroom.findById(req.params.id)
  .then(Review.find({_id}))
  .then(restroom => res.json(restroom))
  .catch(err => res.json(err))
}

export {
  index,
  create,
  deleteRestroom as  delete,
  update,
  show,
}