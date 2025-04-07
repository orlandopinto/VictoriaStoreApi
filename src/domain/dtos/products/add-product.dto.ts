import { ObjectId } from "mongoose";

export class AddProductDto {

	private constructor(


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

	static create(object: { [key: string]: any }): [string?, AddProductDto?] {

		const requiredFields = ['category_id', 'subCategories', 'title', 'subTitle', 'productDescription', 'public_id', 'secure_url', 'isActive', 'productImages', 'productVideos', 'variants', 'rating_id', 'reviews'];
		for (const field of requiredFields) {
			if (object[field] === undefined) return [`Missing ${field} on update Product`];
		}

		return [
			undefined,
			new AddProductDto(
				object.category_id,
				object.subCategories,
				object.title,
				object.subTitle,
				object.productDescription,
				object.public_id,
				object.secure_url,
				object.isActive,
				object.productImages,
				object.productVideos,
				object.variants,
				object.rating_id,
				object.reviews
			)
		];
	}
}
