const Review = require('../models/reviews');

const getReviewById = async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review || review._isDeleted) {
    return res.status(400).json({ message: 'Review does not exist' });
  }

  res.status(200).json(review);
};

const createReview = async (req, res) => {
  try {
    const { product, ...body } = req.body;
    const userId = req.user._id;

    const review = await Review.findOne({ product, user: userId });

    if (review) {
      if (!review._isDeleted) {
        return res
          .status(400)
          .json({ message: 'You already reviewed this product' });
      }
    }

    const newReview = new Review({
      ...body,
      user: userId,
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const body = req.body;
    const review = await Review.findOneAndUpdate(
      {
        _id: reviewId,
      },
      body,
      { new: true },
    );

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findOneAndUpdate(
      {
        _id: reviewId,
      },
      { _isDeleted: true },
      { new: true },
    );

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const { limit = 20, sort = 'DESC', rate, rateType, productId } = req.query;
    const sorting = sort === 'DESC' ? -1 : 1;

    let findParam = {
      product: productId,
      _isDeleted: { $eq: false },
    };
    if (rate) {
      switch (rateType) {
        case 'lessThen':
          findParam.rate = { $lte: rate };
          break;
        case 'greaterThen':
          findParam.rate = { $gte: rate };
          break;
        case 'equal':
          findParam.rate = { $eq: rate };
          break;
        default:
          break;
      }
    }
    const reviews = await Review.find(findParam)
      .sort({ createdAt: sorting })
      .limit(limit);
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviews,
};
