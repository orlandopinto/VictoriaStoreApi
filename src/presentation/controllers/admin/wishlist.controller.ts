import { AppLogger } from "../../../config/appLogger";
import { AddWishListDto } from "../../../domain/dtos/wishlists/add-wishlist.dto";
import { DeleteWishListDto } from "../../../domain/dtos/wishlists/delete-wishlist.dto";
import { UpdateWishListDto } from "../../../domain/dtos/wishlists/update-wishlist.dto";
import { CustomError } from "../../../domain/errors/custom.error";
import { WishListRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";
import { AddWishList } from "../../../domain/usecases/wishlists/add-wishlist.usecase";
import { DeleteWishList } from "../../../domain/usecases/wishlists/delete-wishlist.usecase";
import { GetWishLists } from "../../../domain/usecases/wishlists/get-wishlist.usecase";
import { UpdateWishList } from "../../../domain/usecases/wishlists/update-wishlist.usecase";

export class WishListController {

     logger: AppLogger;

     constructor(private readonly wishlistRepository: WishListRepository) {
          this.logger = new AppLogger("WishListController");
     }

     addWishList = async (req: any, res: any) => {
          const [error, addWishListDto] = AddWishListDto.create(req.body);
          if (error) return this.handleError(error, res);

          await new AddWishList(this.wishlistRepository)
               .execute(addWishListDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     updateWishList = async (req: any, res: any) => {
          const [error, updateWishListDto] = UpdateWishListDto.update(req.body);
          if (error) return this.handleError(error, res);

          await new UpdateWishList(this.wishlistRepository)
               .execute(updateWishListDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     deleteWishList = async (req: any, res: any) => {
          try {
               const [error, deleteWishListDto] = DeleteWishListDto.delete(req.body);
               if (error) return this.handleError(error, res);

               await new DeleteWishList(this.wishlistRepository)
                    .execute(deleteWishListDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleError(error, res));
          } catch (error) {
               this.handleCustomError(error, res);
          }
     }

     getWishLists = async (req: any, res: any) => {
          try {
               const data = await new GetWishLists(this.wishlistRepository).execute();
               return res.json({ ...data, data: data.data.wishlists });
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
