import { AddAccess } from "../../../domain";
import { AddAccessDto, DeleteAccessDto, GetAccessDto } from "../../../domain/dtos/roles-permissions";
import { AccessRepository } from "../../../domain/repositories";
import { DeleteAccess } from "../../../domain/usecases/roles-permissions";
import { GetAccess } from "../../../domain/usecases/roles-permissions/get-access.usecase";

export class AccessController {

     constructor(private readonly accessRepository: AccessRepository) { }

     addAccess = (req: any, res: any) => {
          const [error, addAccessDto] = AddAccessDto.create(req.body);
          if (error) return res.status(400).json({ error });

          new AddAccess(this.accessRepository)
               .execute(addAccessDto!)
               .then((data) => res.json(data))
               .catch(error => { throw { error, res }; });
     }

     deleteAccess = (req: any, res: any) => {
          try {
               const [error, deleteAccessDto] = DeleteAccessDto.delete(req.body);
               if (error) return res.status(400).json({ error });

               new DeleteAccess(this.accessRepository)
                    .execute(deleteAccessDto!)
                    .then((data) => res.json(data))
                    .catch(error => { throw { error, res }; });
          } catch (error) {
               console.log('error: ', error)
          }
     }

     getAccesss = (req: any, res: any) => {
          try {
               const [error] = GetAccessDto.get(req.body);
               if (error) return res.status(400).json({ error });

               new GetAccess(this.accessRepository)
                    .get()
                    .then((data) => res.json(data))
                    .catch(error => { throw { error, res }; });
          } catch (error) {
               console.log('error: ', error)
          }
     }

}