import { AppLogger } from "../../../config/appLogger";
import { AddRating, UpdateRating, DeleteRating, GetRatings } from "../../../domain";
import { AddRatingDto, UpdateRatingDto, DeleteRatingDto } from "../../../domain/dtos/ratings";
import { CustomError } from "../../../domain/errors/custom.error";
import { RatingRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";

export class RatingController {

     logger: AppLogger;

     constructor(private readonly ratingRepository: RatingRepository) {
          this.logger = new AppLogger("RatingController");
     }

     addRating = async (req: any, res: any) => {
          const [error, addRatingDto] = AddRatingDto.create(req.body);
          if (error) return this.handleError(error, res);

          await new AddRating(this.ratingRepository)
               .execute(addRatingDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     updateRating = async (req: any, res: any) => {
          const [error, updateRatingDto] = UpdateRatingDto.update(req.body);
          if (error) return this.handleError(error, res);

          await new UpdateRating(this.ratingRepository)
               .execute(updateRatingDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     deleteRating = async (req: any, res: any) => {
          try {
               const [error, deleteRatingDto] = DeleteRatingDto.delete(req.body);
               if (error) return this.handleError(error, res);

               await new DeleteRating(this.ratingRepository)
                    .execute(deleteRatingDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleError(error, res));
          } catch (error) {
               this.handleCustomError(error, res);
          }
     }

     getRatings = async (req: any, res: any) => {
          try {
               const data = await new GetRatings(this.ratingRepository).execute();
               return res.json({ ...data, data: data.data.ratings });
          } catch (error) {
               this.handleCustomError(error as Error, res);
          }
     }

     private handleCustomError = (error: unknown, res: any) => {
          this.logger.Error(error as Error);
          if (error instanceof CustomError) {
               const responsError: ApiResultResponse = {
                    hasError: true,
                    message: error.message,
                    stackTrace: null,
                    status: "error",
                    statusCode: error.statusCode,
                    data: null
               }
               return res.status(error.statusCode).json(responsError)
          }
          return res.status(500).json({ error: 'Internal Server Error' })
     }

     handleError = (error: string, res: any) => {
          if (error) {
               const responsError: ApiResultResponse = {
                    hasError: true,
                    message: error as string,
                    stackTrace: null,
                    status: "error",
                    statusCode: 400,
                    data: null
               }
               return res.status(400).json(responsError)
          }
     }

}
