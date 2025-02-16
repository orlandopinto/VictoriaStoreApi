import { authorizationSchema } from "../../data/mongodb";

export class AddAuthorizationEntity {

     constructor(
          public id: string,
          public roleId: string,
          public resourseId: string,
          public actionId: string,
          public hasError: boolean | undefined,
          public message: string
     ) { }

}

export class DeleteAuthorizationEntity {

     constructor(
          public id: string,
          public hasError: boolean | undefined,
          public message: string
     ) { }

}

export class GetAuthorizationEntity {

     constructor(
          public authorization: [typeof authorizationSchema],
          public hasError: boolean | undefined,
          public message: string
     ) { }

}