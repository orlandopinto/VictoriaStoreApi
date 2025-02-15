import { AddPermissionsByRole } from "../../../domain";
import { AddPermissionsByRoleDto, DeletePermissionsByRoleDto, GetPermissionsByRolesDto } from "../../../domain/dtos/roles-permissions";
import { PermissionsByRoleRepository } from "../../../domain/repositories";
import { DeletePermissionsByRole } from "../../../domain/usecases/roles-permissions";
import { GetPermissionsByRole } from "../../../domain/usecases/roles-permissions/get-permissions-by-roles.usecase";

export class PermissionsByRoleController {

     constructor(private readonly permissionsByRoleRepository: PermissionsByRoleRepository) { }

     addPermissionsByRole = (req: any, res: any) => {
          const [error, addPermissionsByRoleDto] = AddPermissionsByRoleDto.create(req.body);
          if (error) return res.status(400).json({ error });

          new AddPermissionsByRole(this.permissionsByRoleRepository)
               .execute(addPermissionsByRoleDto!)
               .then((data) => res.json(data))
               .catch(error => { throw { error, res }; });
     }

     deletePermissionsByRole = (req: any, res: any) => {
          try {
               const [error, deletePermissionsByRoleDto] = DeletePermissionsByRoleDto.delete(req.body);
               if (error) return res.status(400).json({ error });

               new DeletePermissionsByRole(this.permissionsByRoleRepository)
                    .execute(deletePermissionsByRoleDto!)
                    .then((data) => res.json(data))
                    .catch(error => { throw { error, res }; });
          } catch (error) {
               console.log('error: ', error)
          }
     }

     getPermissionsByRoles = (req: any, res: any) => {
          try {
               const [error] = GetPermissionsByRolesDto.get(req.body);
               if (error) return res.status(400).json({ error });

               new GetPermissionsByRole(this.permissionsByRoleRepository)
                    .get()
                    .then((data) => res.json(data))
                    .catch(error => { throw { error, res }; });
          } catch (error) {
               console.log('error: ', error)
          }
     }

}