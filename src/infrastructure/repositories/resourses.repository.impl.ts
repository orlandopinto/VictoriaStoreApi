import { ResourseDatasource } from "../../domain/datasources";
import { AddResourseDto, DeleteResourseDto } from "../../domain/dtos/permissions";
import { DeleteResourseEntity, GetResourseEntity, AddResourseEntity } from "../../domain/entities";
import { ResourseRepository } from "../../domain/repositories";

export class ResoursesRepositoryImpl implements ResourseRepository {

     constructor(private readonly resourseDatasource: ResourseDatasource) { }

     addResourse(addResourseDto: AddResourseDto): Promise<AddResourseEntity> {
          return this.resourseDatasource.addResourse(addResourseDto);
     }

     deleteResourse(deleteResourseDto: DeleteResourseDto): Promise<DeleteResourseEntity> {
          return this.resourseDatasource.deleteResourse(deleteResourseDto);
     }

     getResourses(): Promise<GetResourseEntity> {
          return this.resourseDatasource.getResourses();
     }

}