import mongoose, { Schema } from "mongoose";

export const ratingsSchema = new Schema
     (
          {
               product_id: { type: Schema.Types.ObjectId, required: [true, 'Product ID is required'], ref: 'Products' },
               average: { type: mongoose.Schema.Types.Decimal128, required: [true, 'Average is required'] },
               count: { type: Number, required: [true, 'Count value is required'] }
          },
          { versionKey: false }
     )

export const RatingsModel = mongoose.model('Ratings', ratingsSchema);