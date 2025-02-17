import { ActionsModel } from "../../../data/mongodb";
import { AddActionDto, DeleteActionDto } from "../../../domain/dtos/roles-permissions";
import { CustomError } from "../../../domain/errors/custom.error";
import { ActionRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";
import { AddAction, DeleteAction } from "../../../domain/usecases/roles-permissions";

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
               ActionsModel.find()
                    .then(data => res.json({ data }))
                    .catch(error => this.handleCustomError(error, res));
          } catch (error) {
               console.log('error: ', error)
          }
     }

     private handleCustomError = (error: unknown, res: any) => {
          if (error instanceof CustomError) {
               const responsError: ApiResultResponse = {
                    errorMessage: error.message,
                    hasError: true,
                    message: null,
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
                    errorMessage: error as string,
                    hasError: true,
                    message: null,
                    stackTrace: null,
                    status: "error",
                    statusCode: 400,
                    data: null
               }
               return res.status(400).json(responsError)
          }
     }

}