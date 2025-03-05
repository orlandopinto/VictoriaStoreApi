import { AddPageDto, DeletePageDto } from "../dtos/permissions";
import { AddPageEntity, DeletePageEntity, GetPagesEntity } from "../entities";

export abstract class PageRepository {

     abstract addPage(addPageDto: AddPageDto): Promise<AddPageEntity>
     abstract deletePage(deletePageDto: DeletePageDto): Promise<DeletePageEntity>
     abstract getPages(): Promise<GetPagesEntity>

}