import { Restaurant } from '../models/restaurant.js'

function index(req, res) {
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
  Restaurant.create(req.bosy)
  .then(restaurant => {
    restaurant.populate('author')
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