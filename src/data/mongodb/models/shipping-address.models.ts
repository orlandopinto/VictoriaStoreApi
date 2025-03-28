import mongoose, { Schema } from "mongoose";

export const shippingAddressSchema = new Schema
     (
          {
               user_Id: { type: Schema.Types.ObjectId, required: [true, 'User ID is required'], ref: 'Users' },
               firstName: { type: String, required: [true, 'First name name is required'] },
               lastName: { type: String, required: [true, 'Last name name is required'] },
               phoneNumber: { type: String, required: [true, 'Phone number is required'] },
               address: { type: String, required: [true, 'Address is required'] },
               province: { type: String, required: [true, 'Province is required'] },
               city: { type: String, required: [true, 'City is required'] },
               state: { type: String, required: [true, 'State is required'] },
               zipCode: { type: String, required: [true, 'Zipcode is required'] },
               country: { type: String, required: [true, 'Country is required'] },
               isDefault: { type: Boolean, default: false }
          },
          { timestamps: true, versionKey: false }
     )

export const ShippingAddressModel = mongoose.model('ShippingAddress', shippingAddressSchema);