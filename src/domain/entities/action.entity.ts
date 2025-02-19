import { actionsSchema } from "../../data/mongodb";

export class AddActionEntity {

     constructor(
          public id: string,
          public actionName: string,
          public hasError: boolean | undefined,
          public errorMessage: string[]
     ) { }

}

export class DeleteActionEntity {

     constructor(
          public actionName: string,
          public hasError: boolean | undefined,
          public errorMessage: string[]
     ) { }

}

export class GetActionsEntity {

     constructor(
          public actions: [typeof actionsSchema][],
     ) { }

}