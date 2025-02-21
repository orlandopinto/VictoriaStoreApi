import { AddResourseDto, DeleteResourseDto } from "../dtos/permissions";
import { AddResourseEntity, DeleteResourseEntity, GetResourseEntity } from "../entities";

export abstract class ResourseRepository {

     abstract addResourse(addResourseDto: AddResourseDto): Promise<AddResourseEntity>
     abstract deleteResourse(deleteResourseDto: DeleteResourseDto): Promise<DeleteResourseEntity>
     abstract getResourses(): Promise<GetResourseEntity>

}