import { ObjectId } from "mongoose";
import { Decimal, variantsSchema } from "../../data/mongodb";
export class AddVariantEntity {

	constructor(

		public _id: string,
		public product_id: ObjectId,
		public price: typeof Decimal,
		public discount_id: ObjectId,
		public tax_id: ObjectId,
		public sku: string,
		public in_stock: boolean,
		public stock: number,
		public width: number | null,
		public height: number | null,
		public length: number | null,
		public weight: number | null,
		public sort_order: number,
		public attributes: ObjectId[],
		public createdAt?: string,
		public updatedAt?: string

	) { }

}

export class UpdateVariantEntity {

	constructor(

		public _id: string,
		public product_id: ObjectId,
		public price: typeof Decimal,
		public discount_id: ObjectId,
		public tax_id: ObjectId,
		public sku: string,
		public in_stock: boolean,
		public stock: number,
		public width: number | null,
		public height: number | null,
		public length: number | null,
		public weight: number | null,
		public sort_order: number,
		public attributes: ObjectId[],
		public createdAt?: string,
		public updatedAt?: string

	) { }

}

export class DeleteVariantEntity {

	constructor(public _id: string) { }

}

export class GetVariantsEntity {

	constructor(public variants: [typeof variantsSchema][]) { }

}

