import mongoose, { Schema } from "mongoose";

export const categoriesSchema = new Schema
     (
          {
               categoryName: { type: String, required: [true, 'Category name is required'], unique: true },
               slug: { type: String, required: [true, 'Slug is required'], unique: true, lowercase: true, trim: true },
               categoryDescription: { type: String, default: null },
               public_id: { type: String, default: null },
               secure_url: { type: String, default: null }
          },
          { timestamps: true, versionKey: false }
     )

export const CategoriesModel = mongoose.model('Categories', categoriesSchema);