import { error } from "console";
import { ResourseModel } from "../../data/mongodb/models/resourse.model";
import { ResourseDatasource } from "../../domain/datasources";
import { AddResourseDto, DeleteResourseDto } from "../../domain/dtos/roles-permissions";
import { ResourseEntity, DeleteResourseEntity } from "../../domain/entities";
//import { CustomError } from "../../domain/errors/custom.error";
import { ResourseMapper } from "../mappers";

export class ResourseDatasourceImpl implements ResourseDatasource {

     async addResourse(addResourseDto: AddResourseDto): Promise<ResourseEntity> {
          const { resourseName } = addResourseDto;
          try {
               // 1. Crear el resourse
               const resourse = await ResourseModel.create({ resourseName: resourseName })
               await resourse.save();

               // 2. Mapear la respuesta a la entidad
               return ResourseMapper.resourseEntityFromObject(resourse);

          } catch (error) {
               throw error;
          }
     }

     async deleteResourse(deleteResourseDto: DeleteResourseDto): Promise<DeleteResourseEntity> {
          const { resourseName } = deleteResourseDto;
          let message: string = "No hay resourse que coincida con la consulta. Se eliminaron 0 resourses."
          try {
               // 2. eliminar el resourse
               const result = await ResourseModel.deleteOne({ resourseName: resourseName })

               if (result.deletedCount === 1) {
                    message = "Resourse deleted successfully.";
               }
               else {
                    throw message
               }

               // 3. Mapear la respuesta a la entidad
               return ResourseMapper.deleteResourseEntityFromObject({ resourseName, message });

          } catch (error) {
               throw error;
          }
     }

}