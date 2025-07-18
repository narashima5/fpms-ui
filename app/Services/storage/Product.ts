import type { AddProductProps, GetProductProps } from "./types/types"
import { get, set, update } from 'idb-keyval';

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
    const Productdata = await get(PRODUCT_KEY);

    if (Productdata) {
        return Productdata
    }
    return []
}

export const editProduct = async (newData : GetProductProps) => {
    await update(PRODUCT_KEY, (prev) => {

        const updatedData = prev.map((value: { id: string; }) => {
            if (value.id === newData.id) {
                return newData
            }
            return value
        })
        
        return updatedData
    })
}

export const deleteProduct = async (id: string) => {
    await update(PRODUCT_KEY, (prev) => {

        const updatedData = prev.filter((item: { id: string; }) => {
            if (item.id !== id) {
                return item
            }
        })
        return updatedData
    })
}