import mongoose, { Schema } from "mongoose";

export const attributeValuesByNameSchema = new Schema
     (
          {
               attributeName_id: { type: [Schema.Types.ObjectId], required: [true, 'Attribute name ID is required'], ref: 'AttributeNames' },
               attributeValue_id: { type: [Schema.Types.ObjectId], required: [true, 'Attribute value ID is required'], ref: 'AttributeValues' },
          },
          { versionKey: false }
     )

export const AttributeValuesByNameModel = mongoose.model('AttributeValuesByName', attributeValuesByNameSchema);