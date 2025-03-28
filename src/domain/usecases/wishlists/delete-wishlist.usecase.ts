import { DeleteWishListDto } from "../../dtos/wishlists/delete-wishlist.dto";
import { CustomError } from "../../errors/custom.error";
import { DeleteWishListUseCase } from "../../interfaces/IWishList";
import { WishListRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeleteWishList implements DeleteWishListUseCase {

     constructor(private readonly wishlistRepository: WishListRepository) { }

     async execute(deleteWishListDto: DeleteWishListDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const wishlist = await this.wishlistRepository.deleteWishList(deleteWishListDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: wishlist,
                    message: "WishList deleted successfully",
                    statusCode: 201,
                    stackTrace: null
               }
          } catch (error) {
               const err = error as Error
               let statusCode: number = 500;
               if (error instanceof CustomError) {
                    statusCode = error.statusCode;
               }
               resultResponse = {
                    status: "error",
                    hasError: true,
                    data: null,
                    message: err.message,
                    statusCode: statusCode,
                    stackTrace: err.stack
               }
          }
          return resultResponse;
     }
}
