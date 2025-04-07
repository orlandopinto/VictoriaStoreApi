
import { AddRatingDto, UpdateRatingDto, DeleteRatingDto } from "../dtos/ratings";
import { DeleteRatingEntity, GetRatingsEntity, AddRatingEntity, UpdateRatingEntity } from "../entities";

export abstract class RatingDatasource {

     abstract addRating(addRatingDto: AddRatingDto): Promise<AddRatingEntity>
     abstract updateRating(updateRatingDto: UpdateRatingDto): Promise<UpdateRatingEntity>
     abstract deleteRating(deleteRatingDto: DeleteRatingDto): Promise<DeleteRatingEntity>
     abstract getRatings(): Promise<GetRatingsEntity>

}
