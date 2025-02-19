import { actionsSchema } from "../../../data/mongodb";

export class GetActionsDto {
     constructor(
          public actions: [typeof actionsSchema][]
     ) { }

     static get(object: { [key: string]: any }): [string?, GetActionsDto?] {
          const { actions } = object;
          return [
               undefined,
               new GetActionsDto(actions)
          ];
     }

}