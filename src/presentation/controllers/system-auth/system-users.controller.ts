import { AppLogger } from "../../../config/appLogger";
import { AddSystemUser, DeleteSystemUser, GetSystemUsers, UpdateSystemUser } from "../../../domain";
import { AddSystemUserDto } from "../../../domain/dtos/systemusers/add-system-user.dto";
import { DeleteSystemUserDto } from "../../../domain/dtos/systemusers/delete-system-user.dto";
import { UpdateSystemUserDto } from "../../../domain/dtos/systemusers/update-system-user.dto";
import { CustomError } from "../../../domain/errors/custom.error";
import { SystemUserRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";

export class SystemUserController {

     logger: AppLogger;

     constructor(private readonly systemUserRepository: SystemUserRepository) {
          this.logger = new AppLogger("SystemUserController");
     }

     addSystemUser = async (req: any, res: any) => {
          const [error, addUserDto] = AddSystemUserDto.create(req.body);
          if (error) return this.handleError(error, res);

          await new AddSystemUser(this.systemUserRepository)
               .execute(addUserDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     updateSystemUser = async (req: any, res: any) => {
          const [error, updateUserDto] = UpdateSystemUserDto.update(req.body);
          if (error) return this.handleError(error, res);

          await new UpdateSystemUser(this.systemUserRepository)
               .execute(updateUserDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     deleteSystemUser = async (req: any, res: any) => {
          try {
               const [error, deleteUserDto] = DeleteSystemUserDto.delete(req.body);
               if (error) return this.handleError(error, res);

               await new DeleteSystemUser(this.systemUserRepository)
                    .execute(deleteUserDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleError(error, res));
          } catch (error) {
               this.handleCustomError(error, res);
          }
     }

     getSystemUsers = async (req: any, res: any) => {
          try {
               const data = await new GetSystemUsers(this.systemUserRepository).execute();
               return res.json({ ...data, data: data.data.systemUsers });
          } catch (error) {
               this.handleCustomError(error as Error, res);
          }
     }

     private handleCustomError = (error: unknown, res: any) => {
          this.logger.Error(error as Error);
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
