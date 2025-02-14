import { ResourseDatasource } from "../../domain/datasources";
import { AddResourseDto, DeleteResourseDto } from "../../domain/dtos/roles-permissions";
import { DeleteResourseEntity, ResourseEntity } from "../../domain/entities";
import { ResourseRepository } from "../../domain/repositories";

export class ResoursesRepositoryImpl implements ResourseRepository {

     constructor(private readonly resourseDatasource: ResourseDatasource) { }

     addResourse(addResourseDto: AddResourseDto): Promise<ResourseEntity> {
          return this.resourseDatasource.addResourse(addResourseDto);
     }

     deleteResourse(deleteResourseDto: DeleteResourseDto): Promise<DeleteResourseEntity> {
          return this.resourseDatasource.deleteResourse(deleteResourseDto);
     }

}