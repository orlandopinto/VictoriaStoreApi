import mongoose, { Schema } from "mongoose";

export const variantsSchema = new Schema
     (
          {
               product_id: { type: Schema.Types.ObjectId, required: [true, 'Product ID is required'], ref: 'Products' },
               price: { type: mongoose.Schema.Types.Decimal128, required: [true, 'Price is required'] },
               discount_id: { type: Schema.Types.ObjectId, default: null, ref: 'Discounts' },
               sku: { type: String, default: null },
               in_stock: { type: Boolean, required: [true, 'In stock value is required'] },
               stock: { type: Number, required: [true, 'Stock is required'] },
               width: { type: Number, default: null },
               height: { type: Number, default: null },
               length: { type: Number, default: null },
               weight: { type: Number, default: null },
               sort_order: { type: Number, required: [true, 'Sort order is required'] },
               attributes: { type: [Schema.Types.ObjectId], required: [true, 'Attributes are required'], ref: 'Attributes' }
          },
          { timestamps: true, versionKey: false }
     )

export const VariantsModel = mongoose.model('Variants', variantsSchema);