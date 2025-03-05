import { AddPageDto, DeletePageDto } from "../dtos/permissions/index";
import { DeletePageEntity, GetPagesEntity, AddPageEntity } from "../entities";

export abstract class PageDatasource {

     abstract addPage(addPageDto: AddPageDto): Promise<AddPageEntity>
     abstract deletePage(deletePageDto: DeletePageDto): Promise<DeletePageEntity>
     abstract getPages(): Promise<GetPagesEntity>
}