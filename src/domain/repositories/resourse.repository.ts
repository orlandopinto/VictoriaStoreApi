import { AddResourseDto, DeleteResourseDto } from "../dtos/permissions";
import { ResourseEntity, DeleteResourseEntity, GetResourseEntity } from "../entities";

export abstract class ResourseRepository {

     abstract addResourse(addResourseDto: AddResourseDto): Promise<ResourseEntity>
     abstract deleteResourse(deleteResourseDto: DeleteResourseDto): Promise<DeleteResourseEntity>
     abstract getResourses(): Promise<GetResourseEntity>

}