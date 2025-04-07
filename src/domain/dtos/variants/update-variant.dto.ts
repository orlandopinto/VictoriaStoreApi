import { ObjectId } from "mongoose";
import { Decimal } from "../../../data/mongodb";

export class UpdateVariantDto {

	private constructor(

		public _id: string,
		public product_id: ObjectId,
		public price: typeof Decimal,
		public tax_id: ObjectId,
		public discount_id: ObjectId,
		public sku: string,
		public in_stock: boolean,
		public stock: number,
		public width: number,
		public height: number,
		public length: number,
		public weight: number,
		public sort_order: number,
		public attributes: ObjectId[],
		public createdAt?: string,
		public updatedAt?: string

	) { }

	static update(object: { [key: string]: any }): [string?, UpdateVariantDto?] {

		const requiredFields = ['_id', 'product_id', 'price', 'discount_id', 'tax_id', 'sku', 'in_stock', 'stock', 'width', 'height', 'length', 'weight', 'sort_order', 'attributes', 'createdAt', 'updatedAt'];
		for (const field of requiredFields) {
			if (object[field] === undefined) return [`Missing ${field} on update Variant`];
		}

		return [
			undefined,
			new UpdateVariantDto(
				object._id,
				object.product_id,
				object.price,
				object.discount_id,
				object.tax_id,
				object.sku,
				object.in_stock,
				object.stock,
				object.width,
				object.height,
				object.length,
				object.weight,
				object.sort_order,
				object.attributes,
				object.createdAt,
				object.updatedAt
			)
		];
	}
}
