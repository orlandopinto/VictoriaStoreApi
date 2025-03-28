import mongoose, { Schema } from "mongoose";

export const usersSchema = new Schema
     (
          {
               userName: { type: String, required: [true, 'User name is required'] },
               email: { type: String, required: [true, 'Email is required'] },
               password: { type: String, required: [true, 'Password is required'] },
               firstName: { type: String, required: [true, 'First name is required'] },
               lastName: { type: String, required: [true, 'Last name is required'] },
               phoneNumber: { type: String, default: null },
               mobileNumber: { type: String, required: [true, 'Mobile phone number is required'] },
               birthday: { type: Date, default: null },
               public_id: { type: Date, default: null },
               secure_url: { type: Date, default: null },
               emailVerified: { type: Boolean, default: false },
               gender: { type: String, default: null },
               shippingAddresses: { type: [Schema.Types.ObjectId], ref: 'ShippingAddress' },
               wishList: { type: [Schema.Types.ObjectId], ref: 'WishList' },
          },
          { timestamps: true, versionKey: false }
     )

export const UsersModel = mongoose.model('Users', usersSchema);