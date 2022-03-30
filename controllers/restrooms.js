import axios from 'axios'
import { Restroom } from '../models/restroom.js'
import { Review } from '../models/review.js'
import {v2 as cloudinary } from 'cloudinary'

const BASE_URL = 'https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat='

async function getAll(req, res) {
  const LAT = req.params.lat
  const LNG = req.params.lng
  const URL = `${BASE_URL}${LAT}&lng=${LNG}`
  const result = await axios({
    url: URL,
    method: 'GET',
  })
  res.json(result.data)
}

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
  getAll,
}