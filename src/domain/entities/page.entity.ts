import { pagesSchema } from "../../data/mongodb";

export class AddPageEntity {

     constructor(
          public id: string,
          public pageName: string
     ) { }

}

export class DeletePageEntity {

     constructor(
          public pageName: string
     ) { }

}

export class GetPagesEntity {

     constructor(
          public pages: [typeof pagesSchema][],
     ) { }

}