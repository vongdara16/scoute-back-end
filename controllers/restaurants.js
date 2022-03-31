import axios from 'axios'
import { Restaurant } from '../models/restaurant.js'
import { Review } from '../models/review.js'
import { v2 as cloudinary } from 'cloudinary'

const BASE_URL = 'https://api.yelp.com/v3/businesses/search?type=restaurant&location='
const GEO_URL = 'https://api.yelp.com/v3/businesses/search?latitude='

async function getAllByGeo(req, res) {
  const LAT = req.params.lat
  const LNG = req.params.lng
  const URL = `${GEO_URL}${LAT}&longitude=${LNG}`
  const result = await axios({
    url: URL,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    },
  })
  console.log(result.data.businesses);
  res.json({restaurants: result.data.businesses})
}

async function getAll(req, res) {
  const search = req.params.search
  const URL = BASE_URL+search
  const restaurantArr = []
  const result = await axios({
    url: URL,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
  Restaurant.find({})
  .populate('author')
  .then(restaurants => {
    restaurants.forEach(restaurant => {
      if(restaurant.city.toLowerCase() === search.toLowerCase()) {
        result.data.businesses.unshift(restaurant)
      }
    })
    res.json({restaurants: result.data.businesses})
  })
}

function create(req, res) {
  req.body.author = req.user.profile
  if (req.body.photo === 'undefined' || !req.files['photo']) {
    delete req.body['photo']
    Restaurant.create(req.body)
    .then(restaurant => {
      restaurant.populate('author')
      .then(populatedRestaurant => {
        res.status(201).json(populatedRestaurant)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  } else {
    const imageFile = req.files.photo.path
    cloudinary.uploader.upload(imageFile, {tags: `${req.body.name}`})
    .then(image => {
      req.body.photo = image.url
      Restaurant.create(req.body)
      .then(restaurant => {
        restaurant.populate('author')
        .then(populatedRestaurant => {
          res.status(201).json(populatedRestaurant)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    })
  }
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
  getAllByGeo,
  create,
  deleteRestaurant as delete,
  update,
  show,
}