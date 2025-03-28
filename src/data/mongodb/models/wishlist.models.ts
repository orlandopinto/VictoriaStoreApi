import mongoose, { Schema } from "mongoose";

export const wishListSchema = new Schema
     (
          {
               user_Id: { type: Schema.Types.ObjectId, required: [true, 'User ID is required'], ref: 'Users' },
               product_id: { type: Schema.Types.ObjectId, required: [true, 'Product ID is required'], ref: 'Products' },
          },
          { versionKey: false }
     )

export const WishListModel = mongoose.model('WishList', wishListSchema);