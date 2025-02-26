import { ResourseModel } from "../../../data/mongodb";
import { AddResourse, DeleteResourse } from "../../../domain";
import { AddResourseDto, DeleteResourseDto } from "../../../domain/dtos/permissions";
import { ResourseRepository } from "../../../domain/repositories";

export class ResourseController {

     constructor(private readonly resourseRepository: ResourseRepository) { }

     addResourse = (req: any, res: any) => {
          const [error, addResourseDto] = AddResourseDto.create(req.body);
          if (error) return res.status(400).json({ error });

          new AddResourse(this.resourseRepository)
               .execute(addResourseDto!)
               .then((data) => res.json(data))
               .catch(error => { throw { error, res }; });
     }

     deleteResourse = (req: any, res: any) => {
          try {
               const [error, deleteResourseDto] = DeleteResourseDto.delete(req.body);
               if (error) return res.status(400).json({ error });

               new DeleteResourse(this.resourseRepository)
                    .execute(deleteResourseDto!)
                    .then((data) => res.json(data))
                    .catch(error => { throw { error, res }; });
          } catch (error) {
               console.log('error: ', error)
          }
     }

     getResourses = (req: any, res: any) => {
          try {
               ResourseModel.find()
                    .then(data => res.json({ data }))
                    .catch(error => { throw { error, res }; });
          } catch (error) {
               console.log('error: ', error)
          }
     }

}