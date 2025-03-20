import mongoose, { Schema } from "mongoose";

const systemUserSchema = new Schema
     (
          {
               email: { type: String, required: [true, 'Email is required'], unique: true },
               password: { type: String, required: [true, 'Password is required'] },
               firstName: { type: String, default: null },
               lastName: { type: String, default: null },
               phoneNumber: { type: String, default: null },
               public_id: { type: String, default: null },
               secure_url: { type: String, default: null },
               city: { type: String, default: null },
               zipcode: { type: Number, default: null },
               lockoutEnabled: { type: Boolean, default: 0 },
               accessFailedCount: { type: Number, default: 0 },
               address: { type: String, default: null },
               birthDate: { type: Date, default: null },
               roles: { type: [String], default: null },
               isActive: { type: Boolean, default: 1 }
          },
          { timestamps: true, versionKey: false }
     )

export const SystemUserModel = mongoose.model('SystemUsers', systemUserSchema);