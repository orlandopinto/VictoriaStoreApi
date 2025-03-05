import mongoose, { Schema } from "mongoose";

export const permissionsByRoleSchema = new Schema
     (
          {
               id: { type: String, required: [true, 'ID is required'], unique: true },
               roleId: { type: String, required: [true, 'Role ID is required'] },
               roleName: { type: String, required: [true, 'Role name is required'], trim: true },
               pageId: { type: String, required: [true, 'Page ID is required'] },
               pageName: { type: String, required: [true, 'Page name is required'], trim: true },
               actionId: { type: String, required: [true, 'Action ID is required'] },
               actionName: { type: String, required: [true, 'Action name is required'], trim: true }
          }, { versionKey: false }
     )

export const PermissionsByRoleModel = mongoose.model('PermissionsByRole', permissionsByRoleSchema);