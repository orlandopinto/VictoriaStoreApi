import { AddResourseDto, DeleteResourseDto } from "../dtos/roles-permissions/index";
import { DeleteResourseEntity, ResourseEntity } from "../entities";

export abstract class ResourseDatasource {

     abstract addResourse(addResourseDto: AddResourseDto): Promise<ResourseEntity>
     abstract deleteResourse(deleteResourseDto: DeleteResourseDto): Promise<DeleteResourseEntity>

}