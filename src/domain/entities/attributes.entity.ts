import { attributesSchema } from "../../data/mongodb";

export class AddAttributeEntity {

     constructor(
          public id: string,
          public attributeName: string,
          public attributeDescription: string | null
     ) { }

}

export class UpdateAttributeEntity {

     constructor(
          public id: string,
          public attributeName: string,
          public attributeDescription: string | null
     ) { }

}

export class DeleteAttributeEntity {

     constructor(
          public attributeName: string
     ) { }

}

export class GetAttributesEntity {

     constructor(
          public attributes: [typeof attributesSchema][],
     ) { }

}