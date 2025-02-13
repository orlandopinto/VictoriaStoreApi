import { RolesModel } from "../../data/mongodb/models/roles.model";
import { AddRoleDto, DeleteRoleDto } from "../../domain/dtos/roles";
import { CustomError } from "../../domain/errors/custom.error";
import { RolesRepository } from "../../domain/repositories/roles.repository";
import { AddRole } from "../../domain/usecases/roles/add-role.usecase";
import { DeleteRole } from "../../domain/usecases/roles/delete-role.usecase";

export class RoleController {

     constructor(private readonly rolesRepository: RolesRepository) { }

     // #region PUBLIC FUNCTIONS

     addRole = (req: any, res: any) => {
          const [error, addRoleDto] = AddRoleDto.create(req.body);
          if (error) return res.status(400).json({ error });

          new AddRole(this.rolesRepository)
               .execute(addRoleDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleEror(error, res));
     }

     deleteRole = (req: any, res: any) => {
          try {
               const [error, deleteRoleDto] = DeleteRoleDto.delete(req.body);
               if (error) return res.status(400).json({ error });

               new DeleteRole(this.rolesRepository)
                    .execute(deleteRoleDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleEror(error, res));
          } catch (error) {
               console.log('error: ', error)
          }
     }

     getRoles = (req: any, res: any) => {
          try {
               RolesModel.find()
                    .then(result => res.json({ result }))
                    .catch(error => this.handleEror(error, res));
          } catch (error) {
               console.log('error: ', error)
          }
     }

     // #endregion

     // #region PRIVATE FUNCTIONS

     private handleEror = (error: unknown, res: any) => {
          if (error instanceof CustomError) {
               return res.status(error.statusCode).json({ error: error.message })
          }
          console.log('handleEror: ', error)
          return res.status(500).json({ error: 'Internal Server Error' })
     }

     // #endregion
}