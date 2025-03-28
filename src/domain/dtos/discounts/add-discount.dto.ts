
export class AddDiscountDto {
    constructor(

        public _id: string,
        public discountName: string,
        public discountValue: string | null

    ) { }

    static create(object: { [key: string]: any }): [string?, AddDiscountDto?] {
        const { _id, discountName, discountValue } = object;

        if (_id === undefined) return ['Missing _id on create discounts'];
        if (discountName === undefined) return ['Missing discountName on create discounts'];
        if (discountValue === undefined) return ['Missing discountValue  on create discounts'];

        return [
            undefined,
            new AddDiscountDto(_id, discountName, discountValue)
        ];
    }
}
