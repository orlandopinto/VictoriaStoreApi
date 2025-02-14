import { ResourseModel } from "../../data/mongodb";
import { AddResourse } from "../../domain";
import { AddResourseDto, DeleteResourseDto } from "../../domain/dtos/roles-permissions";
import { CustomError } from "../../domain/errors/custom.error";
import { ResourseRepository } from "../../domain/repositories";
import { DeleteResourse } from "../../domain/usecases/roles-permissions";

export class ResourseController {

     constructor(private readonly resourseRepository: ResourseRepository) { }

     addResourse = (req: any, res: any) => {
          const [error, addResourseDto] = AddResourseDto.create(req.body);
          if (error) return res.status(400).json({ error });

          new AddResourse(this.resourseRepository)
               .execute(addResourseDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleEror(error, res));
     }

     deleteResourse = (req: any, res: any) => {
          try {
               const [error, deleteResourseDto] = DeleteResourseDto.delete(req.body);
               if (error) return res.status(400).json({ error });

               new DeleteResourse(this.resourseRepository)
                    .execute(deleteResourseDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleEror(error, res));
          } catch (error) {
               console.log('error: ', error)
          }
     }

     getResourses = (req: any, res: any) => {
          try {
               ResourseModel.find()
                    .then(data => res.json({ data }))
                    .catch(error => this.handleEror(error, res));
          } catch (error) {
               console.log('error: ', error)
          }
     }

     // #region PRIVATE FUNCTIONS

     private handleEror = (error: unknown, res: any) => {
          if (error instanceof CustomError) {
               return res.status(error.statusCode).json({ error: error.message })
          }
          console.log('handleEror: ', error)
          return res.status(500).json({ error: 'Internal Server Error' })
     }

}