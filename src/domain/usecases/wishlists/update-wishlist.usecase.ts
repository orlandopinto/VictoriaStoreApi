import { UpdateWishListDto } from "../../dtos/wishlists/update-wishlist.dto";
import { CustomError } from "../../errors/custom.error";
import { UpdateWishListUseCase } from "../../interfaces/IWishList";
import { WishListRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class UpdateWishList implements UpdateWishListUseCase {

     constructor(private readonly wishlistRepository: WishListRepository) { }

     async execute(updateWishListDto: UpdateWishListDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const wishlist = await this.wishlistRepository.updateWishList(updateWishListDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: wishlist,
                    message: "WishList updated successfully",
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
