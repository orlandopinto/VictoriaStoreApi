import { productVideosSchema } from "../../data/mongodb";
export class AddProductVideoEntity {

     constructor(

          public _id: string,
          public public_id: string,
          public public_secure_url: string

     ) { }

}


export class DeleteProductVideoEntity {

     constructor(public _id: string) { }

}

export class GetProductVideosEntity {

     constructor(public productVideos: [typeof productVideosSchema][]) { }

}

