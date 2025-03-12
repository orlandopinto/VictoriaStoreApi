import mongoose, { Schema } from "mongoose";

export const actionsSchema = new Schema
     (
          { actionName: { type: String, required: [true, 'Action name is required'], unique: true } },
          { versionKey: false }
     )

export const ActionsModel = mongoose.model('Actions', actionsSchema);