import { AddDiscountDto } from "../../domain/dtos/discounts/add-discount.dto";
import { DeleteDiscountDto } from "../../domain/dtos/discounts/delete-discount.dto";
import { UpdateDiscountDto } from "../../domain/dtos/discounts/update-discount.dto";

import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddDiscountUseCase {
     execute(addDiscountDto: AddDiscountDto): Promise<ApiResultResponse>
}

export interface UpdateDiscountUseCase {
     execute(updateDiscountDto: UpdateDiscountDto): Promise<ApiResultResponse>
}

export interface DeleteDiscountUseCase {
     execute(deleteDiscountDto: DeleteDiscountDto): Promise<ApiResultResponse>
}

export interface GetDiscountsUseCase {
     execute(): Promise<ApiResultResponse>
}
