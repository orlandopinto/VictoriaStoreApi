import mongoose, { Schema } from "mongoose";

export const pagesSchema = new Schema
     (
          { pageName: { type: String, required: [true, 'Page name is required'], unique: true } },
          { versionKey: false }
     )

export const PagesModel = mongoose.model('Pages', pagesSchema);