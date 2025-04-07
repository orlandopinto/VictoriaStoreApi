import { attributeValuesSchema } from "../../data/mongodb";

export class AddAttributeValueEntity {

     constructor(

          public _id: string,
          public attributeValue: string

     ) { }

}

export class UpdateAttributeValueEntity {

     constructor(

          public _id: string,
          public attributeValue: string

     ) { }

}

export class DeleteAttributeValueEntity {

     constructor(
          public _id: string,
          public attributeValue: string
     ) { }

}

export class GetAttributeValuesEntity {

     constructor(public attributeValues: [typeof attributeValuesSchema][]) { }

}

