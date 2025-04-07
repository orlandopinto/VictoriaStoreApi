import { productImagesSchema } from "../../data/mongodb/models/product-images.model";
export class AddProductImageEntity {

     constructor(

          public _id: string,
          public public_id: string,
          public secure_url: string

     ) { }

}

export class DeleteProductImageEntity {

     constructor(public _id: string) { }

}

export class GetProductImagesEntity {

     constructor(public productImages: [typeof productImagesSchema][]) { }

}

