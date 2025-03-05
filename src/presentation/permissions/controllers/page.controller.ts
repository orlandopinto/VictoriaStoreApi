import { PagesModel } from "../../../data/mongodb";
import { AddPage, DeletePage } from "../../../domain";
import { AddPageDto, DeletePageDto } from "../../../domain/dtos/permissions";
import { PageRepository } from "../../../domain/repositories";

export class PageController {

     constructor(private readonly pageRepository: PageRepository) { }

     addPage = (req: any, res: any) => {
          const [error, addPageDto] = AddPageDto.create(req.body);
          if (error) return res.status(400).json({ error });

          new AddPage(this.pageRepository)
               .execute(addPageDto!)
               .then((data) => res.json(data))
               .catch(error => { throw { error, res }; });
     }

     deletePage = (req: any, res: any) => {
          try {
               const [error, deletePageDto] = DeletePageDto.delete(req.body);
               if (error) return res.status(400).json({ error });

               new DeletePage(this.pageRepository)
                    .execute(deletePageDto!)
                    .then((data) => res.json(data))
                    .catch(error => { throw { error, res }; });
          } catch (error) {
               console.log('error: ', error)
          }
     }

     getPages = (req: any, res: any) => {
          try {
               PagesModel.find()
                    .then(data => res.json({ data }))
                    .catch(error => { throw { error, res }; });
          } catch (error) {
               console.log('error: ', error)
          }
     }

}