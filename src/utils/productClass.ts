export class Product {
    name: string
    price: number
    id: string
    timestamp: number
    description: string
    picture: string

    constructor(name: string, price: number, id: string, timestamp: number, description: string, picture: string) {
        this.name = name;
        this.price = price;
        this.id = id;
        this.timestamp = timestamp;
        this.description = description;
        this.picture = picture;
    }
}
