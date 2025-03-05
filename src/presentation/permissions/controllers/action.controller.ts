import { AddAction, DeleteAction, GetActions } from "../../../domain";
import { AddActionDto, DeleteActionDto, GetActionsDto } from "../../../domain/dtos/permissions";
import { CustomError } from "../../../domain/errors/custom.error";
import { ActionRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";

export class ActionController {

     constructor(private readonly actionRepository: ActionRepository) { }

     addAction = async (req: any, res: any) => {
          const [error, addActionDto] = AddActionDto.create(req.body);
          if (error) return this.handleError(error, res);

          new AddAction(this.actionRepository)
               .execute(addActionDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     deleteAction = (req: any, res: any) => {
          try {
               const [error, deleteActionDto] = DeleteActionDto.delete(req.body);
               if (error) return res.status(400).json({ error });

               new DeleteAction(this.actionRepository)
                    .execute(deleteActionDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleCustomError(error, res));
          } catch (error) {
               console.log('error: ', error)
          }
     }

     getActions = (req: any, res: any) => {
          try {
               const [error] = GetActionsDto.get(req.body);
               if (error) return this.handleError(error, res);

               new GetActions(this.actionRepository)
                    .execute()
                    .then((data) => {
                         //NOTE: Asignar objeto.data para que lo devuelva a la api como data
                         data.data = data.data.actions
                         return res.json(data)
                    })
                    .catch(error => this.handleCustomError(error, res));
          } catch (error) {
               console.log('error: ', error)
          }
     }

     private handleCustomError = (error: unknown, res: any) => {
          if (error instanceof CustomError) {
               const responsError: ApiResultResponse = {
                    hasError: true,
                    message: error.message,
                    stackTrace: null,
                    status: "error",
                    statusCode: error.statusCode,
                    data: null
               }
               return res.status(error.statusCode).json(responsError)
          }
          return res.status(500).json({ error: 'Internal Server Error' })
     }

     handleError = (error: string, res: any) => {
          if (error) {
               const responsError: ApiResultResponse = {
                    hasError: true,
                    message: error as string,
                    stackTrace: null,
                    status: "error",
                    statusCode: 400,
                    data: null
               }
               return res.status(400).json(responsError)
          }
     }

}