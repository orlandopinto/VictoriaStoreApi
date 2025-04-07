import { ObjectId } from "mongoose";
import { productsSchema } from "../../data/mongodb";
export class AddProductEntity {

	constructor(

		public category_id: ObjectId,
		public subCategories: ObjectId[],
		public title: string,
		public subTitle: string,
		public productDescription: string,
		public public_id: string,
		public secure_url: string,
		public isActive: boolean,
		public productImages: ObjectId[],
		public productVideos: ObjectId[],
		public variants: ObjectId[],
		public rating_id: ObjectId,
		public reviews: ObjectId[]

	) { }

}

export class UpdateProductEntity {

	constructor(

		public _id: string,
		public category_id: ObjectId,
		public subCategories: ObjectId[],
		public title: string,
		public subTitle: string,
		public productDescription: string,
		public public_id: string,
		public secure_url: string,
		public isActive: boolean,
		public productImages: ObjectId[],
		public productVideos: ObjectId[],
		public variants: ObjectId[],
		public rating_id: ObjectId,
		public reviews: ObjectId[],
		public createdAt?: string,
		public updatedAt?: string

	) { }

}

export class DeleteProductEntity {

	constructor(public _id: string) { }

}

export class GetProductsEntity {

	constructor(public products: [typeof productsSchema][]) { }

}

