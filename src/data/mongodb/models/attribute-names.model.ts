import mongoose, { Schema } from "mongoose";

export const attributeNamesSchema = new Schema
     (
          {
               attributeName: { type: String, required: [true, 'Attribute name is required'], unique: true },
          },
          { versionKey: false }
     )

export const AttributeNamesModel = mongoose.model('AttributeNames', attributeNamesSchema);