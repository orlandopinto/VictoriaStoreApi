import { GetTaxesEntity } from "../entities";

export abstract class TaxDatasource {

     abstract getTaxes(): Promise<GetTaxesEntity>

}