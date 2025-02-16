import mongoose, { Schema } from "mongoose";

export const accessSchema = new Schema
     (
          {
               roleId: { type: String, required: [true, 'Role ID is required'] },
               resourseId: { type: String, required: [true, 'Resourse ID is required'] },
               actionId: { type: String, required: [true, 'Action ID is required'] }
          }, { versionKey: false }
     )

export const AccessModel = mongoose.model('Access', accessSchema);