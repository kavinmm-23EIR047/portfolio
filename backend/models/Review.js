import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profileUrl: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      required: true,
      default: 5,
    },
    comment: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    ownerReply: {
      type: String,
      default: '',
    },
    badge: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      default: 'Google Maps',
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
