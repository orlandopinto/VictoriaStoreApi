import mongoose, { Schema } from "mongoose";

const systemUserSchema = new Schema(
     {
          userName: {
               type: String,
               unique: true,
               required: [true, 'User Name is required']
          },
          email: {
               type: String,
               required: [true, 'Email is required'],
               unique: true,
               lowercase: true
          },
          password: {
               type: String,
               required: [true, 'Password is required']
          },
          firstName: {
               type: String
          },
          lastName: {
               type: String
          },
          phoneNumber: {
               type: String
          },
          imageProfilePath: {
               type: String
          },
          city: {
               type: String
          },
          zipcode: {
               type: Number
          },
          lockoutEnabled: {
               type: Boolean,
               default: 0
          },
          accessFailedCount: {
               type: Number,
               default: 0
          },
          address: {
               type: String
          },
          birthDate: {
               type: Date,
          },
          roles: {
               type: [String]
          }
     },
     {
          timestamps: true
     })

export const SystemUserModel = mongoose.model('SystemUsers', systemUserSchema);