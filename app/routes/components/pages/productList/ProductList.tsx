import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { getProduct } from "~/Services/storage/Product";
import { useEffect, useState } from "react";
import type { GetProductProps } from "~/Services/storage/types/types";

export default function ProductList() {

    const [productList, setProductList] = useState<GetProductProps[]>([])

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/products/addProduct')
    }

    async function getData(){
        const productData = await getProduct();
        setProductList(productData);
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            <header className="flex justify-end">
                <Button variant="contained" onClick={handleClick}>Add Product</Button>
            </header>

            <div className="mt-4">
                <Paper>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead >
                                <TableRow >
                                    <TableCell align="center">Product Name</TableCell>
                                    <TableCell align="center">Brand Name</TableCell>
                                    <TableCell align="center">Category</TableCell>
                                    <TableCell align="center">HSN</TableCell>
                                    <TableCell align="center">MRP</TableCell>
                                    <TableCell align="center">Selling Price</TableCell>
                                    <TableCell align="center">Tax</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    productList.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell align="center">{product.productName}</TableCell>
                                            <TableCell align="center">{product.brandName}</TableCell>
                                            <TableCell align="center">{product.category}</TableCell>
                                            <TableCell align="center">{product.hsn}</TableCell>
                                            <TableCell align="center">{product.mrp}</TableCell>
                                            <TableCell align="center">{product.sellingPrice}</TableCell>
                                            <TableCell align="center">{product.tax}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </div>
    )
}