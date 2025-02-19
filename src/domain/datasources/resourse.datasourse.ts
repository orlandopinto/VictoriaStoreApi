import { AddResourseDto, DeleteResourseDto } from "../dtos/permissions/index";
import { DeleteResourseEntity, GetResourseEntity, ResourseEntity } from "../entities";

export abstract class ResourseDatasource {

     abstract addResourse(addResourseDto: AddResourseDto): Promise<ResourseEntity>
     abstract deleteResourse(deleteResourseDto: DeleteResourseDto): Promise<DeleteResourseEntity>
     abstract getResourses(): Promise<GetResourseEntity>
}