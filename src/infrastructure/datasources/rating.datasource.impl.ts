import { AddRatingDto, DeleteRatingDto, UpdateRatingDto } from "../../domain/dtos/ratings";
import { AppLogger } from "../../config/appLogger";
import { Decimal, RatingsModel, ratingsSchema } from "../../data/mongodb/models/ratings.model";
import { RatingDatasource } from "../../domain/datasources";
import { AddRatingEntity, DeleteRatingEntity, GetRatingsEntity, UpdateRatingEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";
import { ObjectId } from "mongoose";

export class RatingDatasourceImpl implements RatingDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("RatingDatasourceImpl");
     }

     async addRating(addRatingDto: AddRatingDto): Promise<AddRatingEntity> {

          const { product_id, average, count } = addRatingDto;

          try {
               const result = await RatingsModel.create({ product_id, average, count })
               await result.save();
               return new AddRatingEntity(result._id.toString(), result.product_id as unknown as ObjectId, result.average as unknown as typeof Decimal, result.count,);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async updateRating(updateRatingDto: UpdateRatingDto): Promise<UpdateRatingEntity> {
          const { _id, product_id, average, count } = updateRatingDto;
          try {
               const result = await RatingsModel.findByIdAndUpdate(
                    _id,
                    {
                         _id, product_id, average, count
                    },
                    { new: true });

               if (!result)
                    throw CustomError.notFound('Rating not found.');

               return new UpdateRatingEntity(result._id.toString(), result.product_id as unknown as ObjectId, result.average as unknown as typeof Decimal, result.count);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async deleteRating(deleteRatingDto: DeleteRatingDto): Promise<DeleteRatingEntity> {

          const { _id } = deleteRatingDto;
          try {
               const rating = await RatingsModel.findOne({ _id: _id })
               if (!rating) throw CustomError.badRequest("Rating does not exist or has been deleted.")
               await RatingsModel.deleteOne({ _id: _id })
               return new DeleteRatingEntity(_id);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async getRatings(): Promise<GetRatingsEntity> {
          try {
               const result = await RatingsModel.find() as unknown as [typeof ratingsSchema][]
               return new GetRatingsEntity(result);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }
}
