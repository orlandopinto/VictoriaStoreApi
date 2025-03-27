import mongoose, { Schema } from "mongoose";

export const reviewsSchema = new Schema
     (
          {
               product_id: { type: Schema.Types.ObjectId, required: [true, 'Product ID is required'], ref: 'Products' },
               user_Id: { type: Schema.Types.ObjectId, required: [true, 'User ID is required'], ref: 'Users' },
               rating: { type: mongoose.Schema.Types.Decimal128, required: [true, 'Rating value is required'] },
               count: { type: Number, required: [true, 'Count value is required'] },
               comment: { type: String, required: [true, 'Comment value is required'] }
          },
          { versionKey: false }
     )

export const ReviewsModel = mongoose.model('Reviews', reviewsSchema);