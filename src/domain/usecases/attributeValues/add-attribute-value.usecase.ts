﻿import { AddAttributeValueDto } from "../../dtos/attributeValues";
import { CustomError } from "../../errors/custom.error";
import { AddAttributeValueUseCase } from "../../interfaces";
import { AttributeValueRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class AddAttributeValue implements AddAttributeValueUseCase {

     constructor(private readonly attributeValueRepository: AttributeValueRepository) { }

     async execute(addAttributeValueDto: AddAttributeValueDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const attributevalue = await this.attributeValueRepository.addAttributeValue(addAttributeValueDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: attributevalue,
                    message: "Attribute value created successfully",
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
