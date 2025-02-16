import { AddAuthorization } from "../../../domain";
import { AddAuthorizationDto, DeleteAuthorizationDto, GetAuthorizationDto } from "../../../domain/dtos/roles-permissions";
import { AuthorizationRepository } from "../../../domain/repositories";
import { DeleteAuthorization } from "../../../domain/usecases/roles-permissions";
import { GetAuthorization } from "../../../domain/usecases/roles-permissions/get-authorization.usecase";

export class AuthorizationController {

     constructor(private readonly authorizationRepository: AuthorizationRepository) { }

     addAuthorization = (req: any, res: any) => {
          const [error, addAuthorizationDto] = AddAuthorizationDto.create(req.body);
          if (error) return res.status(400).json({ error });

          new AddAuthorization(this.authorizationRepository)
               .execute(addAuthorizationDto!)
               .then((data) => res.json(data))
               .catch(error => { throw { error, res }; });
     }

     deleteAuthorization = (req: any, res: any) => {
          try {
               const [error, deleteAuthorizationDto] = DeleteAuthorizationDto.delete(req.body);
               if (error) return res.status(400).json({ error });

               new DeleteAuthorization(this.authorizationRepository)
                    .execute(deleteAuthorizationDto!)
                    .then((data) => res.json(data))
                    .catch(error => { throw { error, res }; });
          } catch (error) {
               console.log('error: ', error)
          }
     }

     getAuthorizations = (req: any, res: any) => {
          try {
               const [error] = GetAuthorizationDto.get(req.body);
               if (error) return res.status(400).json({ error });

               new GetAuthorization(this.authorizationRepository)
                    .get()
                    .then((data) => res.json(data))
                    .catch(error => { throw { error, res }; });
          } catch (error) {
               console.log('error: ', error)
          }
     }

}