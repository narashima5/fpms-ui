import type { AddProductProps, GetProductProps } from "./types/types"
import { get, set } from 'idb-keyval';

const PRODUCT_KEY = 'products';

export const addProduct = async (product: AddProductProps) => {
    const newproductWithID = {
        id: crypto.randomUUID(),
        ...product
    }

    const productList = await getProduct();

    const currentData = [
        ...productList,
        newproductWithID
    ]

    await set(PRODUCT_KEY, currentData)
}



export const getProduct = async () => {
    let Productdata = await get(PRODUCT_KEY);

    if (Productdata) {
        return Productdata
    }
    return []
}