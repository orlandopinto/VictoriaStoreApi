import { AddResourseDto, DeleteResourseDto } from "../dtos/roles-permissions";
import { ResourseEntity, DeleteResourseEntity } from "../entities";

export abstract class ResourseRepository {

     abstract addResourse(addResourseDto: AddResourseDto): Promise<ResourseEntity>
     abstract deleteResourse(deleteResourseDto: DeleteResourseDto): Promise<DeleteResourseEntity>

}