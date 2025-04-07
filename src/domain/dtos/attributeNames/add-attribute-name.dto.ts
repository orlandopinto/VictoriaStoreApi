
export class AddAttributeNameDto {
    constructor(

        public attributeName: string

    ) { }

    static create(object: { [key: string]: any }): [string?, AddAttributeNameDto?] {
        const { attributeName } = object;

        if (attributeName === undefined) return ['Missing attribute name on create attribute'];

        return [
            undefined,
            new AddAttributeNameDto(attributeName)
        ];
    }
}
