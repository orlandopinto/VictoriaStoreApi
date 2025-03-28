import { AppLogger } from "../../../config/appLogger";
import { AddShippingAddressDto } from "../../../domain/dtos/shippingAddresses/add-shipping-address.dto";
import { DeleteShippingAddressDto } from "../../../domain/dtos/shippingAddresses/delete-shipping-address.dto";
import { UpdateShippingAddressDto } from "../../../domain/dtos/shippingAddresses/update-shipping-address.dto";
import { CustomError } from "../../../domain/errors/custom.error";
import { ShippingAddressRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";
import { AddShippingAddress } from "../../../domain/usecases/shippingAddresses/add-shipping-address.usecase";
import { DeleteShippingAddress } from "../../../domain/usecases/shippingAddresses/delete-shipping-address.usecase";
import { GetShippingAddresses } from "../../../domain/usecases/shippingAddresses/get-shipping-address.usecase";
import { UpdateShippingAddress } from "../../../domain/usecases/shippingAddresses/update-shipping-address.usecase";

export class ShippingAddressController {

     logger: AppLogger;

     constructor(private readonly shippingaddressRepository: ShippingAddressRepository) {
          this.logger = new AppLogger("ShippingAddressController");
     }

     addShippingAddress = async (req: any, res: any) => {
          const [error, addShippingAddressDto] = AddShippingAddressDto.create(req.body);
          if (error) return this.handleError(error, res);

          await new AddShippingAddress(this.shippingaddressRepository)
               .execute(addShippingAddressDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     updateShippingAddress = async (req: any, res: any) => {
          const [error, updateShippingAddressDto] = UpdateShippingAddressDto.update(req.body);
          if (error) return this.handleError(error, res);

          await new UpdateShippingAddress(this.shippingaddressRepository)
               .execute(updateShippingAddressDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     deleteShippingAddress = async (req: any, res: any) => {
          try {
               const [error, deleteShippingAddressDto] = DeleteShippingAddressDto.delete(req.body);
               if (error) return this.handleError(error, res);

               await new DeleteShippingAddress(this.shippingaddressRepository)
                    .execute(deleteShippingAddressDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleError(error, res));
          } catch (error) {
               this.handleCustomError(error, res);
          }
     }

     getShippingAddresses = async (req: any, res: any) => {
          try {
               const data = await new GetShippingAddresses(this.shippingaddressRepository).execute();
               return res.json({ ...data, data: data.data.shippingaddresses });
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
