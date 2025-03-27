import mongoose, { Schema } from "mongoose";

export const discountsSchema = new Schema
     (
          {
               discountName: { type: String, required: [true, 'Discount name is required'], unique: true },
               discountValue: { type: mongoose.Schema.Types.Decimal128, required: [true, 'Discount value is required'] }
          },
          { timestamps: true, versionKey: false }
     )

export const DiscountsModel = mongoose.model('Discounts', discountsSchema);