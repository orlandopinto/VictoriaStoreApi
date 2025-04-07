import mongoose, { Schema } from "mongoose";

export const attributeValuesSchema = new Schema
     (
          {
               attributeValue: { type: String, required: [true, 'Attribute value is required'], unique: true },
          },
          { versionKey: false }
     )

export const AttributeValuesModel = mongoose.model('AttributeValues', attributeValuesSchema);