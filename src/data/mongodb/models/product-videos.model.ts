import mongoose, { Schema } from "mongoose";

export const productVideosSchema = new Schema
     (
          {
               public_id: { type: String, required: [true, 'Public ID is required'] },
               secure_url: { type: String, required: [true, 'Secure url is required'] }
          },
          { versionKey: false }
     )

export const ProductVideosModel = mongoose.model('ProductVideos', productVideosSchema);