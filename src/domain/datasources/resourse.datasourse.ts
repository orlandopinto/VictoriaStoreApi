import { AddResourseDto, DeleteResourseDto } from "../dtos/permissions/index";
import { DeleteResourseEntity, GetResourseEntity, AddResourseEntity } from "../entities";

export abstract class ResourseDatasource {

     abstract addResourse(addResourseDto: AddResourseDto): Promise<AddResourseEntity>
     abstract deleteResourse(deleteResourseDto: DeleteResourseDto): Promise<DeleteResourseEntity>
     abstract getResourses(): Promise<GetResourseEntity>
}