import { AppLogger } from "../../config/appLogger";
import { AttributeValueDatasource } from "../../domain/datasources";
import { AddAttributeValueEntity, DeleteAttributeValueEntity, GetAttributeValuesEntity, UpdateAttributeValueEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";
import { AttributeValuesModel, attributeValuesSchema } from "../../data/mongodb";
import { AddAttributeValueDto, UpdateAttributeValueDto, DeleteAttributeValueDto } from "../../domain/dtos/attributeValues";

export class AttributeValueDatasourceImpl implements AttributeValueDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("AttributeValueDatasourceImpl");
     }

     async addAttributeValue(addAttributeValueDto: AddAttributeValueDto): Promise<AddAttributeValueEntity> {

          const { attributeValue } = addAttributeValueDto;

          try {

               const attributevalue = await AttributeValuesModel.findOne({ attributeValue: attributeValue })
               if (attributevalue) throw CustomError.badRequest('AttributeValue already exists.')
               const result = await AttributeValuesModel.create({ attributeValue })
               await result.save();
               return new AddAttributeValueEntity(result._id.toString(), result.attributeValue);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async updateAttributeValue(updateAttributeValueDto: UpdateAttributeValueDto): Promise<UpdateAttributeValueEntity> {
          const { _id, attributeValue } = updateAttributeValueDto;
          try {
               const result = await AttributeValuesModel.findByIdAndUpdate(
                    _id,
                    {
                         _id, attributeValue
                    },
                    { new: true });

               if (!result)
                    throw CustomError.notFound('AttributeValue not found.');

               return new UpdateAttributeValueEntity(result._id.toString(), result.attributeValue);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async deleteAttributeValue(deleteAttributeValueDto: DeleteAttributeValueDto): Promise<DeleteAttributeValueEntity> {

          const { _id } = deleteAttributeValueDto;
          try {
               const attribute = await AttributeValuesModel.findOne({ _id: _id })
               if (!attribute) throw CustomError.badRequest("AttributeValue does not exist or has been deleted.")
               await AttributeValuesModel.deleteOne({ _id: _id })
               return new DeleteAttributeValueEntity(attribute._id.toString(), attribute.attributeValue);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async getAttributeValues(): Promise<GetAttributeValuesEntity> {
          try {
               const result = await AttributeValuesModel.find() as unknown as [typeof attributeValuesSchema][]
               return new GetAttributeValuesEntity(result);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }
}
