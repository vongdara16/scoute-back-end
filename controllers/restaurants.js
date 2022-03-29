import axios from 'axios'
import { Restaurant } from '../models/restaurant.js'
import { Review } from '../models/review.js'
import { v2 as cloudinary } from 'cloudinary'

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

// function create (req, res) {
//   req.body.author = req.user.profile
//   Restaurant.create(req.body)
//   .then(restaurant => {
//     restaurant.populate('author')
//     .then(populatedRestaurant => {
//       res.status(201).json(populatedRestaurant)
//     })
//   })
//   .catch(err => {
//     res.json(err)
//   })
// }
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
  create,
  deleteRestaurant as delete,
  update,
  show,
}