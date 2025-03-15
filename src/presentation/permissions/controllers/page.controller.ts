import { AppLogger } from "../../../config/appLogger";
import { AddPage, DeletePage, GetPages } from "../../../domain";
import { AddPageDto, DeletePageDto, GetPagesDto } from "../../../domain/dtos/permissions";
import { PageRepository } from "../../../domain/repositories";

export class PageController {

     logger: AppLogger;

     constructor(private readonly pageRepository: PageRepository) {
          this.logger = new AppLogger("ActionController");
     }

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
               this.logger.Error(error as Error);
          }
     }

     getPages = (req: any, res: any) => {
          try {
               const [error, getPagesDto] = GetPagesDto.get(req.body);
               if (error) return res.status(400).json({ error });

               new GetPages(this.pageRepository)
                    .execute()
                    .then((data) => res.json(data))
                    .catch(error => { throw { error, res }; });
          } catch (error) {
               this.logger.Error(error as Error);
          }
     }

}