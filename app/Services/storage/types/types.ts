export interface AddProductProps {
    productName: string;
    brandName: string;
    sellingPrice: number | null;
    mrp: number | null;
    hsn: string;
    category: string;
    tax: number | null;
}

export interface GetProductProps {
    id: string;
    productName: string;
    brandName: string;
    sellingPrice: number | null;
    mrp: number | null;
    hsn: string;
    category: string;
    tax: number | null;
}