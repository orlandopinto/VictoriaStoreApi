import { AppLogger } from "../../../config/appLogger";
import { AddDiscountDto } from "../../../domain/dtos/discounts/add-discount.dto";
import { DeleteDiscountDto } from "../../../domain/dtos/discounts/delete-discount.dto";
import { UpdateDiscountDto } from "../../../domain/dtos/discounts/update-discount.dto";
import { CustomError } from "../../../domain/errors/custom.error";
import { DiscountRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";
import { AddDiscount } from "../../../domain/usecases/discounts/add-discount.usecase";
import { DeleteDiscount } from "../../../domain/usecases/discounts/delete-discount.usecase";
import { GetDiscounts } from "../../../domain/usecases/discounts/get-discounts.usecase";
import { UpdateDiscount } from "../../../domain/usecases/discounts/update-discount.usecase";

export class DiscountController {

     logger: AppLogger;

     constructor(private readonly discountRepository: DiscountRepository) {
          this.logger = new AppLogger("DiscountController");
     }

     addDiscount = async (req: any, res: any) => {
          const [error, addDiscountDto] = AddDiscountDto.create(req.body);
          if (error) return this.handleError(error, res);

          await new AddDiscount(this.discountRepository)
               .execute(addDiscountDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     updateDiscount = async (req: any, res: any) => {
          const [error, updateDiscountDto] = UpdateDiscountDto.update(req.body);
          if (error) return this.handleError(error, res);

          await new UpdateDiscount(this.discountRepository)
               .execute(updateDiscountDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     deleteDiscount = async (req: any, res: any) => {
          try {
               const [error, deleteDiscountDto] = DeleteDiscountDto.delete(req.body);
               if (error) return this.handleError(error, res);

               await new DeleteDiscount(this.discountRepository)
                    .execute(deleteDiscountDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleError(error, res));
          } catch (error) {
               this.handleCustomError(error, res);
          }
     }

     getDiscounts = async (req: any, res: any) => {
          try {
               const data = await new GetDiscounts(this.discountRepository).execute();
               return res.json({ ...data, data: data.data.discounts });
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