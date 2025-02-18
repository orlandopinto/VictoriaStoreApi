import mongoose, { Schema } from "mongoose";

export const permissionsSchema = new Schema
     (
          {
               id: { type: String, required: [true, 'ID is required'], unique: true },
               roleId: { type: String, required: [true, 'Role ID is required'] },
               roleName: { type: String, required: [true, 'Role name is required'], trim: true },
               resourseId: { type: String, required: [true, 'Resourse ID is required'] },
               resourseName: { type: String, required: [true, 'Resourse name is required'], trim: true },
               actionId: { type: String, required: [true, 'Action ID is required'] },
               actionName: { type: String, required: [true, 'Action name is required'], trim: true }
          }, { versionKey: false }
     )

export const PermissionsModel = mongoose.model('Permissions', permissionsSchema);