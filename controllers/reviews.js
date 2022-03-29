import { Review } from '../models/review.js'
import axios from 'axios'

function create(req, res) {
  Review.create(req.body.reviewId)
  .then(review => {
    review.populate('author')
  })
  .catch(err => {
    res.json(err)
  })
}

function update(req, res) {
  Review.findByIdAndUpdate(req.params.reviewId, req.body, {new: true})
  .then(review => res.json(review))
  .catch(err => res.json(err))
}

function deleteReview(req, res) {
  Review.findByIdAndDelete(req.params.reviewId)
  .then(review => res.json(review))
  .catch(err => res.json(err))
}

// function getRestaurantReviews (req, res) {
//   Parking.find({})
//   .then(parkinglot => {
//     res.json(parkinglot)
//   })
//   .catch(err => {
//     res.json
//   })
// }

async function getRestaurantReviews(req, res) {
  console.log('TESTING THIS FUNCTION')
  console.log(req.params)
  const reviews = req.params.restaurantId
  const URL = `https://api.yelp.com/v3/businesses/${reviews}/reviews`

  const result = await axios({
    url: URL,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
  console.log('RESULTS', result.data.reviews)
  res.json({reviews: result.data.reviews})

}

export {
  create,
  update,
  deleteReview as delete,
  getRestaurantReviews
}