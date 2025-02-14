import { ActionsModel } from "../../../data/mongodb";
import { AddActionDto, DeleteActionDto } from "../../../domain/dtos/roles-permissions";
import { ActionRepository } from "../../../domain/repositories";
import { AddAction, DeleteAction } from "../../../domain/usecases/roles-permissions";

export class ActionController {

     constructor(private readonly actionRepository: ActionRepository) { }

     addAction = (req: any, res: any) => {
          const [error, addActionDto] = AddActionDto.create(req.body);
          if (error) return res.status(400).json({ error });

          new AddAction(this.actionRepository)
               .execute(addActionDto!)
               .then((data) => res.json(data))
               .catch(error => { throw { error, res }; });
     }

     deleteAction = (req: any, res: any) => {
          try {
               const [error, deleteActionDto] = DeleteActionDto.delete(req.body);
               if (error) return res.status(400).json({ error });

               new DeleteAction(this.actionRepository)
                    .execute(deleteActionDto!)
                    .then((data) => res.json(data))
                    .catch(error => { throw { error, res }; });
          } catch (error) {
               console.log('error: ', error)
          }
     }

     getActions = (req: any, res: any) => {
          try {
               ActionsModel.find()
                    .then(data => res.json({ data }))
                    .catch(error => { throw { error, res }; });
          } catch (error) {
               console.log('error: ', error)
          }
     }

}