import mongoose, { Schema } from "mongoose";

export const rolesSchema = new Schema
     (
          {
               roleName: { type: String, required: [true, 'Role name is required'], unique: true },
               roleDescription: { type: String, trim: true, default: null }
          },
          {
               timestamps: true,
               versionKey: false
          }
     )

export const RolesModel = mongoose.model('Roles', rolesSchema);