import { accessSchema } from "../../data/mongodb";

export class AddAccessEntity {

     constructor(
          public id: string,
          public roleId: string,
          public resourseId: string,
          public actionId: string,
          public hasError: boolean | undefined,
          public errorMessages: string[]
     ) { }

}

export class DeleteAccessEntity {

     constructor(
          public id: string,
          public hasError: boolean | undefined,
          public message: string
     ) { }

}

export class GetAccessEntity {

     constructor(
          public access: [typeof accessSchema][],
          public hasError: boolean | undefined,
          public message: string
     ) { }

}