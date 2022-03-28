import axios from 'axios'
import { Restaurant } from '../models/restaurant.js'
import { Review } from '../models/review.js'

const BASE_URL = 'https://api.yelp.com/v3/businesses/search?type=restaurant&location='

async function getAll(req, res) {
  // console.log('THIS IS THE ZIPCODE', req.params.search)
  const search = req.params.search
  const URL = BASE_URL+search
  const result = await axios({
    url: URL,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
  res.json({restaurants: result.data.businesses})
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
  getAll, 
  create,
  deleteRestaurant as delete,
  update,
  show,
}