import { AddWishListDto } from "../../dtos/wishlists/add-wishlist.dto";
import { CustomError } from "../../errors/custom.error";
import { AddWishListUseCase } from "../../interfaces";
import { WishListRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class AddWishList implements AddWishListUseCase {

     constructor(private readonly wishlistRepository: WishListRepository) { }

     async execute(addWishListDto: AddWishListDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const wishlist = await this.wishlistRepository.addWishList(addWishListDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: wishlist,
                    message: "WishList created successfully",
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
