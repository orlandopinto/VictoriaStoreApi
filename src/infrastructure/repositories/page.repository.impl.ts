import { PageDatasource } from "../../domain/datasources";
import { AddPageDto, DeletePageDto } from "../../domain/dtos/permissions";
import { DeletePageEntity, GetPagesEntity, AddPageEntity } from "../../domain/entities";
import { PageRepository } from "../../domain/repositories";

export class PageRepositoryImpl implements PageRepository {

     constructor(private readonly pageDatasource: PageDatasource) { }

     addPage(addPageDto: AddPageDto): Promise<AddPageEntity> {
          return this.pageDatasource.addPage(addPageDto);
     }

     deletePage(deletePageDto: DeletePageDto): Promise<DeletePageEntity> {
          return this.pageDatasource.deletePage(deletePageDto);
     }

     getPages(): Promise<GetPagesEntity> {
          return this.pageDatasource.getPages();
     }

}