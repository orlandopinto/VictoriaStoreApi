
export class AddDiscountDto {
    constructor(

        public discountName: string,
        public discountValue: string | null

    ) { }

    static create(object: { [key: string]: any }): [string?, AddDiscountDto?] {
        const { discountName, discountValue } = object;

        if (discountName === undefined) return ['Missing discountName on create discounts'];
        if (discountValue === undefined) return ['Missing discountValue on create discounts'];

        return [
            undefined,
            new AddDiscountDto(discountName, discountValue)
        ];
    }
}
