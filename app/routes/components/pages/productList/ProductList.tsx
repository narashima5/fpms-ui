import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { deleteProduct, getProduct } from "~/Services/storage/Product";
import { useEffect, useState } from "react";
import type { GetProductProps } from "~/Services/storage/types/types";
import UpdateProductDialogue from "./UpdateProduct";
import noDataImg from './images/no-data.png'

export default function ProductList() {

    const [productList, setProductList] = useState<GetProductProps[]>([])
    const [updateProduct, setUpdateProduct] = useState<GetProductProps>()

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/products/addProduct')
    }

    async function getData() {
        const productData = await getProduct();
        setProductList(productData);
    }



    useEffect(() => {
        getData()
    }, [])

    const handleClose = (refetch = false) => {
        setUpdateProduct(undefined);
        if (refetch) {
            getData()
        }
    }

    const handleEdit = (product: GetProductProps) => {
        setUpdateProduct(product)
    }

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure to delete?")) {
            deleteProduct(id)
            getData()
        }
    }

    return (
        <div>
            <header className="flex justify-end">
                <Button variant="contained" hidden={productList.length === 0} onClick={handleClick}>Add Product</Button>
            </header>

            <div className="mt-4">
                <Paper>
                    <TableContainer>
                        {
                            productList.length !== 0 ? (
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
                                            <TableCell align="center"></TableCell>
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
                                                    <TableCell align="center">
                                                        <IconButton sx={{ marginRight: '1rem' }} onClick={() => handleEdit(product)}>
                                                            <EditIcon color="primary" />
                                                        </IconButton>

                                                        <IconButton onClick={() => handleDelete(product.id)}>
                                                            <DeleteIcon color="error" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="flex flex-col items-center mb-4">
                                    <img src={noDataImg} alt="" className="size-[35rem]" />
                                    <Button variant="contained" className="w-1/6" onClick={handleClick}>Add Product</Button>
                                </div>
                            )
                        }
                    </TableContainer>
                </Paper>

                {
                    updateProduct ? (
                        <UpdateProductDialogue open={!!updateProduct} onClose={handleClose} product={updateProduct} />
                    ) : null
                }
            </div>
        </div>
    )
}

