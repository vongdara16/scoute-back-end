import { Parking } from '../models/parkinglot.js'
import { Review } from '../models/review.js'
import { v2 as cloudinary } from 'cloudinary'
import { Restaurant } from '../models/restaurant.js'

function index (req, res) {
  const search = req.params.search
  const pARR= []
  Parking.find({})
  .then(parkinglot => {
    parkinglot.forEach(parking => {
      if (parking.city.toLowerCase() === search.toLowerCase()) {
        pARR.push(parking)
      }
    })
    return res.json(pARR)
      // return pARR.forEach(park => res.json(park))
  })
  .catch(err => {
    res.json(err)
  })
}

function create(req, res) {
  req.body.author = req.user.profile
  if (req.body.photo === 'undefined' || !req.files['photo']) {
    delete req.body['photo']
    Parking.create(req.body)
    .then(parkinglot => {
      parkinglot.populate('author')
      .then(populatedParking => {
        res.status(201).json(populatedParking)
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
      Parking.create(req.body)
      .then(parkinglot => {
        parkinglot.populate('author')
        .then(populatedParking => {
          res.status(201).json(populatedParking)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    })
  }
}

function deleteParking(req, res) {
  Parking.findByIdAndDelete(req.params.id)
  .then(parkinglot => res.json(parkinglot))
  .catch(err => res.json(err))
}


function update(req, res) {
  if (req.body.photo === 'undefined' || !req.files['photo'])
  {
    delete req.body['photo']
    Parking.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(parkinglot => {
      parkinglot.populate('author')
      .then(populatedParkinglot => {
        res.status(201).json(populatedParkinglot)
      })
    })
    .catch(err => {
      console.log(err)
      Restaurant.status(500).json(err)
    })
  } else {
    const imageFile = req.files.photo.path
    cloudinary.uploader.upload(imageFile, {tags: `${req.body.name}`})
    .then(image => {
      req.body.photo = image.url
      Parking.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(parkinglot => {
        parkinglot.populate('author')
        .then(populatedParkinglot => {
          res.status(201).json(populatedParkinglot)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    })
  }
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