import mongoose, { Schema } from "mongoose";

export const productImagesSchema = new Schema
     (
          {
               product_id: { type: Schema.Types.ObjectId, required: [true, 'Product ID is required'], ref: 'Products' },
               public_id: { type: String, required: [true, 'Public ID is required'] },
               secure_url: { type: String, required: [true, 'Secure url is required'] }
          },
          { versionKey: false }
     )

export const ProductImagesModel = mongoose.model('ProductImages', productImagesSchema);