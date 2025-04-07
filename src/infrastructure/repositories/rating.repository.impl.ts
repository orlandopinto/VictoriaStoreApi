import { RatingDatasource } from "../../domain/datasources";
import { AddRatingDto, UpdateRatingDto, DeleteRatingDto } from "../../domain/dtos/ratings";
import { AddRatingEntity, DeleteRatingEntity, GetRatingsEntity, UpdateRatingEntity } from "../../domain/entities";
import { RatingRepository } from "../../domain/repositories";

export class RatingRepositoryImpl implements RatingRepository {

     constructor(private readonly ratingDatasource: RatingDatasource) { }

     addRating(addRatingDto: AddRatingDto): Promise<AddRatingEntity> {
          return this.ratingDatasource.addRating(addRatingDto);
     }

     updateRating(updateRatingDto: UpdateRatingDto): Promise<UpdateRatingEntity> {
          return this.ratingDatasource.updateRating(updateRatingDto);
     }

     deleteRating(deleteRatingDto: DeleteRatingDto): Promise<DeleteRatingEntity> {
          return this.ratingDatasource.deleteRating(deleteRatingDto);
     }

     getRatings(): Promise<GetRatingsEntity> {
          return this.ratingDatasource.getRatings();
     }

}
