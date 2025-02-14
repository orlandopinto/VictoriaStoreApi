export class ActionEntity {

     constructor(
          public id: string,
          public actionName: string
     ) { }

}

export class DeleteActionEntity {

     constructor(
          public actionName: string,
          public message: string
     ) { }

}