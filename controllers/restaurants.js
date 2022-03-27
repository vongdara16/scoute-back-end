import { Restaurant } from '../models/restaurant.js'
import { Review } from '../models/review.js'

function index(req, res) {
  console.log('test index')
  //able to reach this console log. api needs to be called
  Restaurant.find({})
  .then(restaurants => {
    res.json(restaurants)
  })
  .catch(err => {
    res.json(err)
  })
}

function create (req, res) {
  req.body.author = req.user.profile
  Restaurant.create(req.body)
  .then(restaurant => {
    restaurant.populate('author')
  })
  .catch(err => {
    res.json(err)
  })
}

function deleteRestaurant(req, res) {
  Restaurant.findByIdAndDelete(req.params.id)
  .then(restaurant => res.json(restaurant))
  .catch(err => res.json(err))
}

function update(req, res) {
  Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(restaurant => res.json(restaurant))
  .catch(err => res.json(err))
}

function show(req, res) {
  Restaurant.findById(req.params.id)
  .then(Review.find({_id}))
  .then(restaurant => res.json(restaurant))
  .catch(err => res.json(err))
}

export {
  index, 
  create,
  deleteRestaurant as delete,
  update,
  show,
}