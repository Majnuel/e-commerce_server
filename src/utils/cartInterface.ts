import { isProduct } from "./productInterface";

export interface isCart {
    id: string,
    timestamp: number,
    products: isProduct[]
}