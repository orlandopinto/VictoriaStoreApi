
export class AddAttributeDto {
    constructor(

        public _id: string,
        public attributeName: string,
        public attributeValue: string | null

    ) { }

    static create(object: { [key: string]: any }): [string?, AddAttributeDto?] {
        const { _id, attributeName, attributeValue } = object;

        if (attributeName === undefined) return ['Missing attribute name on create attribute'];
        if (attributeValue === undefined) return ['Missing attribute value | null on create attribute'];

        return [
            undefined,
            new AddAttributeDto(_id, attributeName, attributeValue)
        ];
    }
}
