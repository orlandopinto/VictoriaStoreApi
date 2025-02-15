import mongoose, { Schema } from "mongoose";

export const permissionsActionsSchema = new Schema
     (
          {
               idRole: { type: String, required: [true, 'ID role is required'] },
               idResourse: { type: String, required: [true, 'ID Resourse is required'] },
               idAction: { type: String, required: [true, 'ID Action name is required'] }
          }
     )

export const permissionsByRoleSchema = new Schema
     (
          {
               permissionId: { type: String, required: [true, 'id permission  is required'], trim: true, unique: true },
               roleName: { type: String, required: [true, 'Role name is required'], lowercase: true, trim: true },
               resourseName: { type: String, required: [true, 'Resourse name is required'], lowercase: true, trim: true },
               permissionActionsIds: { type: permissionsActionsSchema, require: true, unique: true }
          },
          { timestamps: true }
     )

export const PermissionsByRoleModel = mongoose.model('PermissionsByRole', permissionsByRoleSchema);