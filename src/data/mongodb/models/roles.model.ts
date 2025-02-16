import mongoose, { Schema } from "mongoose";

const rolesSchema = new Schema
     (
          {
               roleName: { type: String, required: [true, 'Role name is required'], unique: true, lowercase: true }
          },
          { versionKey: false }
     )

export const RolesModel = mongoose.model('Roles', rolesSchema);