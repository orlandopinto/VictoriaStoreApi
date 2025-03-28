import mongoose, { Schema } from "mongoose";

export const attributesSchema = new Schema
     (
          {
               attributeName: { type: String, required: [true, 'Attribute name is required'] },
               attributeValue: { type: String, required: [true, 'Attribute value is required'] }
          },
          { versionKey: false }
     )

export const AttributesModel = mongoose.model('Attributes', attributesSchema);