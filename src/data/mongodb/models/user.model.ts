import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
     {
          name: {
               type: String,
               required: [true, 'Name is required']
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
          img: {
               type: String
          },
          roles: {
               type: [String],          // Arreglo de strings
               default: ['USER_ROLE'],  // Valor por defecto
               enum: ['USER_ROLE', 'ADMIN_ROLE']
          }
     },
     {
          timestamps: true
     })

export const UserModel = mongoose.model('User', userSchema);