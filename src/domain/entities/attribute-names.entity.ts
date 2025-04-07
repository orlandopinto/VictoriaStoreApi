import { attributeNamesSchema } from "../../data/mongodb";

export class AddAttributeNameEntity {

     constructor(
          public _id: string,
          public attributeName: string
     ) { }

}

export class UpdateAttributeNameEntity {

     constructor(
          public _id: string,
          public attributeName: string
     ) { }

}

export class DeleteAttributeNameEntity {

     constructor(
          public _id: string,
          public attributeName: string
     ) { }

}

export class GetAttributeNamesEntity {

     constructor(
          public attributes: [typeof attributeNamesSchema][],
     ) { }

}