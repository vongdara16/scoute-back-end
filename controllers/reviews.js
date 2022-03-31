import { Review } from '../models/review.js'
import axios from 'axios'

function create(req, res) {
  req.body.author = req.user.profile
  if(req.body.restaurant === ''){
    delete req.body['restaurant']
  }
  Review.create(req.body)
  .then(review => {
    review.populate('author')
    .then(populatedReview => {
      res.status(201).json(populatedReview)
    })
  }).catch(err => {
    res.json(err)
  })
}

function update(req, res) {
  Review.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(review => res.json(review))
  .catch(err => res.json(err))
}

function deleteReview(req, res) {
  Review.findByIdAndDelete(req.params.reviewId)
  .then(review => res.json(review))
  .catch(err => res.json(err))
}

async function getRestaurantReviews(req, res) {
  console.log('TEST THIS REVIEW FUNC')
  const reviews = req.params.restaurantId
  const URL = `https://api.yelp.com/v3/businesses/${reviews}/reviews`
  console.log('reviews req.params.restid',reviews)
  const reviewArr = []
  if (reviews.length === 24 ){
    Review.find({})
    .populate('author')
    .then(reviews => {
      reviews.forEach(review => {
        console.log('REVIEW', review)
        if (review._id === req.params.restaurantId){
          reviewArr.unshift(review)
        }
      })
      // console.log('REVARR', revArr)
      res.json({reviews: reviewArr})
    })
  } else {
    const result = await axios({
      url: URL,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
      }
    })
      Review.find({})
      .populate('author')
      .then(reviews => {
        reviews.forEach(review => {
          if (review.yelprestaurant === req.params.restaurantId){
            result.data.reviews.unshift(review)
          }
        })
        res.json({reviews: result.data.reviews})
      })
  }
}

async function getRestroomReviews(req, res) {
  // console.log('THIS IS THE RESTROOM FUNC')
  // console.log('REQ BODY', req.body)
  // console.log('REQ PARAMS', req.params)
  const reviewArr = []
  Review.find({})
  .populate('author')
  .then(reviews => {
    reviews.forEach(review => {
      if (review.restroomId === req.params.restroomId){
        // result.data.reviews.unshift(review)
        reviewArr.unshift(review)
      }
    })
    res.json({reviews: reviewArr})
  })
}

export {
  create,
  update,
  deleteReview as delete,
  getRestaurantReviews,
  getRestroomReviews,
}
