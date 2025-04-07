import { AddAttributeNameDto } from "../dtos/attributeNames/add-attribute-name.dto"
import { DeleteAttributeNameDto } from "../dtos/attributeNames/delete-attribute-name.dto"
import { UpdateAttributeNameDto } from "../dtos/attributeNames/update-attribute-name.dto"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddAttributeUseCase {
     execute(addAttributeNameDto: AddAttributeNameDto): Promise<ApiResultResponse>
}

export interface UpdateAttributeUseCase {
     execute(updateAttributeNameDto: UpdateAttributeNameDto): Promise<ApiResultResponse>
}

export interface DeleteAttributeUseCase {
     execute(deleteAttributeNameDto: DeleteAttributeNameDto): Promise<ApiResultResponse>
}

export interface GetAttributesUseCase {
     execute(): Promise<ApiResultResponse>
}
