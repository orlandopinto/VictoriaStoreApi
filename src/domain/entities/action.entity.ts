import { actionsSchema } from "../../data/mongodb";

export class AddActionEntity {

     constructor(
          public id: string,
          public actionName: string
     ) { }

}

export class DeleteActionEntity {

     constructor(
          public actionName: string
     ) { }

}

export class GetActionsEntity {

     constructor(
          public actions: [typeof actionsSchema][],
     ) { }

}