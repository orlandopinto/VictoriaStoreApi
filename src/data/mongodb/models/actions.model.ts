import mongoose, { Schema } from "mongoose";

const actionsSchema = new Schema
     (
          {
               actionName: { type: String, required: [true, 'Action name is required'], unique: true, lowercase: true, trim: true }
          },
          { versionKey: false }
     )

export const ActionsModel = mongoose.model('Actions', actionsSchema);