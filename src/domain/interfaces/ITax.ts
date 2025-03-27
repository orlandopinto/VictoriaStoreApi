import { ApiResultResponse } from "../types/api-result-response.type"

export interface GetTaxesUseCase {
     execute(): Promise<ApiResultResponse>
}