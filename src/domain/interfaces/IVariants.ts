
import { AddVariantDto, UpdateVariantDto, DeleteVariantDto } from "../dtos/variants"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddVariantUseCase {
     execute(addVariantDto: AddVariantDto): Promise<ApiResultResponse>
}

export interface UpdateVariantUseCase {
     execute(updateVariantDto: UpdateVariantDto): Promise<ApiResultResponse>
}

export interface DeleteVariantUseCase {
     execute(deleteVariantDto: DeleteVariantDto): Promise<ApiResultResponse>
}

export interface GetVariantsUseCase {
     execute(): Promise<ApiResultResponse>
}
