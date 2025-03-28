import { AddWishListDto } from "../../domain/dtos/wishlists/add-wishlist.dto";
import { DeleteWishListDto } from "../../domain/dtos/wishlists/delete-wishlist.dto";
import { UpdateWishListDto } from "../../domain/dtos/wishlists/update-wishlist.dto";
import { AppLogger } from "../../config/appLogger";
import { WishListModel, wishListSchema } from "../../data/mongodb/models/wishlist.models";
import { WishListDatasource } from "../../domain/datasources";
import { AddWishListEntity, DeleteWishListEntity, GetWishListsEntity, UpdateWishListEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class WishListDatasourceImpl implements WishListDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("WishListDatasourceImpl");
     }

     async addWishList(addWishListDto: AddWishListDto): Promise<AddWishListEntity> {

          const { _id, user_Id, product_id } = addWishListDto;

          try {

               const wishlist = await WishListModel.findOne({ user_Id: user_Id, product_id: product_id })
               if (wishlist) throw CustomError.badRequest('WishList already exists.')
               const result = await WishListModel.create({ _id, user_Id, product_id })
               await result.save();
               return new AddWishListEntity(result._id.toString(), result.user_Id.toString(), result.product_id.toString());

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async updateWishList(updateWishListDto: UpdateWishListDto): Promise<UpdateWishListEntity> {
          const { _id, user_Id, product_id } = updateWishListDto;
          try {
               const result = await WishListModel.findByIdAndUpdate(
                    _id,
                    {
                         _id, user_Id, product_id
                    },
                    { new: true });

               if (!result)
                    throw CustomError.notFound('WishList not found.');

               return new UpdateWishListEntity(result._id.toString(), result.user_Id.toString(), result.product_id.toString());
               //Agregar si es necesario result.createdAt as unknown as string, result.updatedAt as unknown as string);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async deleteWishList(deleteWishListDto: DeleteWishListDto): Promise<DeleteWishListEntity> {

          const { _id } = deleteWishListDto;
          try {
               const wishlist = await WishListModel.findOne({ _id: _id })
               if (!wishlist) throw CustomError.badRequest("WishList does not exist or has been deleted.")
               await WishListModel.deleteOne({ _id: _id })
               return new DeleteWishListEntity(wishlist._id.toString());

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async getWishLists(): Promise<GetWishListsEntity> {
          try {
               const result = await WishListModel.find() as unknown as [typeof wishListSchema][]
               return new GetWishListsEntity(result);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }
}
