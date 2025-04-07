import mongoose, { Schema } from "mongoose";

export const productsSchema = new Schema
     (
          {
               category_id: { type: Schema.Types.ObjectId, required: [true, 'Category ID is required'], ref: 'Categories' },
               subCategories: { type: [Schema.Types.ObjectId], required: [true, 'Sub categories are required'], ref: 'SubCategories' },
               title: { type: String, required: [true, 'Title is required'] },
               subTitle: { type: String, required: [true, 'Sub title is required'] },
               productDescription: { type: String, default: null },
               public_id: { type: String, required: [true, 'Public id image is required'] },
               secure_url: { type: String, required: [true, 'Secure url image is required'] },
               isActive: { type: Boolean, default: 1 },
               productImages: { type: [Schema.Types.ObjectId], default: null, ref: 'ProductImages' },
               productVideos: { type: [Schema.Types.ObjectId], default: null, ref: 'ProductVideos' },
               variants: { type: [Schema.Types.ObjectId], default: null, ref: 'Variants' },
               rating_id: { type: Schema.Types.ObjectId, default: null, ref: 'Ratings' },
               reviews: { type: [Schema.Types.ObjectId], default: null, ref: 'Reviews' }
          },
          { timestamps: true, versionKey: false }
     )

export const ProductsModel = mongoose.model('Products', productsSchema);