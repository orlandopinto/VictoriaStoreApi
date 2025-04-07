
export class AddProductVideoDto {
    constructor(

        public _id: string,
        public public_id: string,
        public secure_url: string

    ) { }

    static create(object: { [key: string]: any }): [string?, AddProductVideoDto?] {
        const requiredFields = ['public_id', 'secure_url'];

        for (const field of requiredFields) {
            if (object[field] === undefined) return [`Missing ${field} on update User`];
        }

        return [
            undefined,
            new AddProductVideoDto(
                object._id,
                object.public_id,
                object.secure_url
            )
        ];
    }
}
