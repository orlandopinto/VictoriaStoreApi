import { ResourseModel, resourseSchema } from "../../data/mongodb/models/resourse.model";
import { ResourseDatasource } from "../../domain/datasources";
import { AddResourseDto, DeleteResourseDto } from "../../domain/dtos/permissions";
import { DeleteResourseEntity, GetResourseEntity, AddResourseEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class ResourseDatasourceImpl implements ResourseDatasource {

     async addResourse(addResourseDto: AddResourseDto): Promise<AddResourseEntity> {
          const { resourseName } = addResourseDto;
          try {
               // 1. Crear el resourse
               const resourse = await ResourseModel.create({ resourseName: resourseName })
               await resourse.save();

               // 2. Mapear la respuesta a la entidad
               return new AddResourseEntity(resourse.id, resourseName);

          } catch (error) {
               throw error;
          }
     }

     async deleteResourse(deleteResourseDto: DeleteResourseDto): Promise<DeleteResourseEntity> {
          const { resourseName } = deleteResourseDto;
          try {
               const exists = await ResourseModel.findOne({ resourseName: resourseName })
               if (!exists) throw CustomError.badRequest("The resourse name does not exist or has been deleted.")

               // 2. eliminar el resourse
               const result = await ResourseModel.deleteOne({ resourseName: resourseName })

               // 3. Mapear la respuesta a la entidad
               return new DeleteResourseEntity(resourseName);

          } catch (error) {
               throw error;
          }
     }

     async getResourses(): Promise<GetResourseEntity> {
          try {

               const resourses = await ResourseModel.find() as unknown as [typeof resourseSchema][]

               return new GetResourseEntity(resourses);

          } catch (error) {
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
     }

}