import mongoose, { Schema } from "mongoose";

export const taxesSchema = new Schema
     (
          { taxValue: { type: mongoose.Schema.Types.Decimal128, required: [true, 'Tax value name is required'] } },
          { timestamps: true, versionKey: false }
     )

export const TaxesModel = mongoose.model('Taxes', taxesSchema);