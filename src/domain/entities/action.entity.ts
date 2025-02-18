export class ActionEntity {

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