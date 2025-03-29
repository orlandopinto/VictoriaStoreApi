import { AppLogger } from "../../../config/appLogger";
import { AddUserDto } from "../../../domain/dtos/users/add-user.dto";
import { DeleteUserDto } from "../../../domain/dtos/users/delete-user.dto";
import { UpdateUserDto } from "../../../domain/dtos/users/update-user.dto";
import { CustomError } from "../../../domain/errors/custom.error";
import { UserRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";
import { AddUser } from "../../../domain/usecases/users/add-user.usecase";
import { DeleteUser } from "../../../domain/usecases/users/delete-user.usecase";
import { GetUsers } from "../../../domain/usecases/users/get-users.usecase";
import { UpdateUser } from "../../../domain/usecases/users/update-user.usecase";

export class UsersController {

     logger: AppLogger;

     constructor(private readonly userRepository: UserRepository) {
          this.logger = new AppLogger("UserController");
     }

     addUser = async (req: any, res: any) => {
          const [error, addUserDto] = AddUserDto.create(req.body);
          if (error) return this.handleError(error, res);

          await new AddUser(this.userRepository)
               .execute(addUserDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     updateUser = async (req: any, res: any) => {
          const [error, updateUserDto] = UpdateUserDto.update(req.body);
          if (error) return this.handleError(error, res);

          await new UpdateUser(this.userRepository)
               .execute(updateUserDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     deleteUser = async (req: any, res: any) => {
          try {
               const [error, deleteUserDto] = DeleteUserDto.delete(req.body);
               if (error) return this.handleError(error, res);

               await new DeleteUser(this.userRepository)
                    .execute(deleteUserDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleError(error, res));
          } catch (error) {
               this.handleCustomError(error, res);
          }
     }

     getUsers = async (req: any, res: any) => {
          try {
               const data = await new GetUsers(this.userRepository).execute();
               return res.json({ ...data, data: data.data.users });
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
