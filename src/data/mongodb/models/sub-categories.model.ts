import mongoose, { Schema } from "mongoose";

export const subCategoriesSchema = new Schema
     (
          {
               subCategoryName: { type: String, required: [true, 'Sub category name is required'], unique: true },
               slug: { type: String, required: [true, 'Slug is required'], unique: true, lowercase: true, trim: true },
               CategoryId: { type: Schema.Types.ObjectId, required: [true, 'Category Id is required'], ref: 'Categories' },
               subCategoryDescription: { type: String, default: null }
          },
          { timestamps: true, versionKey: false }
     )

export const SubCategoriesModel = mongoose.model('SubCategories', subCategoriesSchema);