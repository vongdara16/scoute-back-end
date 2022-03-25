import { Review } from '../models/review.js'

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

export {
  create,
  update,
  deleteReview as delete,
}