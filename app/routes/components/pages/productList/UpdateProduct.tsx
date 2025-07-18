import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { editProduct } from "~/Services/storage/Product";
import type { GetProductProps } from "~/Services/storage/types/types";

interface UpdateProductProps {
    open: boolean;
    onClose: (refetch?: boolean) => void;
    product: GetProductProps
}

export default function UpdateProductDialogue({ open, onClose, product }: UpdateProductProps) {

    const CategoryMenu = [
        'Fertilizers',
        'Pesticides',
        'Seeds'
    ]

    const initialValues = {
        id: product.id,
        productName: product.productName || '',
        brandName: product.brandName || '',
        sellingPrice: product.sellingPrice || null,
        mrp: product.mrp || null,
        hsn: product.hsn || '',
        category: product.category || '',
        tax: product.tax || null
    }

    const validationSchema = Yup.object({
        productName: Yup.string().required("Required Field"),
        brandName: Yup.string().required("Required Field"),
        sellingPrice: Yup.number().required("Required Field"),
        mrp: Yup.number().required("Required Field"),
        hsn: Yup.string().required("Required Field"),
        category: Yup.string().required("Required Field"),
        tax: Yup.number().required("Required Field").min(0).max(100),
    })

    const {
        values,
        errors,
        touched,
        handleSubmit,
        resetForm,
        handleChange,
        handleBlur
    } = useFormik<GetProductProps>({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (data) => {
            const formattedValue = {
                ...data,
                sellingPrice: Number(data.sellingPrice),
                mrp: Number(data.mrp),
                tax: Number(data.tax)
            }
            await editProduct(formattedValue)
            handleClose();
        }
    })

    const handleClose = () => {
        resetForm()
        onClose(true)
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h6" component="div">
                    Edit Product
                </Typography>
                <Typography variant="body2">
                    Update Product information
                </Typography>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box
                        component={'div'}
                        className="flex flex-col gap-3"
                    >
                        <TextField
                            label='Product Name'
                            required
                            name="productName"
                            error={!!(errors.productName && touched.productName)}
                            helperText={(errors.productName && touched.productName) && errors.productName}
                            value={values.productName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            label='Brand Name'
                            required
                            name="brandName"
                            error={!!(errors.brandName && touched.brandName)}
                            helperText={(errors.brandName && touched.brandName) && errors.brandName}
                            value={values.brandName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="menu1">Category*</InputLabel>
                            <Select
                                labelId="menu1"
                                required
                                onChange={handleChange}
                                value={values.category}
                                label="Category"
                                name="category"
                                onBlur={handleBlur}
                                error={!!(errors.category && touched.category)}
                            >
                                {
                                    CategoryMenu.map((value) => {
                                        return (
                                            <MenuItem value={value} key={value}>{value}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            label='HSN'
                            required
                            name="hsn"
                            error={!!(errors.hsn && touched.hsn)}
                            helperText={(errors.hsn && touched.hsn) && errors.hsn}
                            value={values.hsn}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            label='Selling Price'
                            required
                            name="sellingPrice"
                            type="number"
                            error={!!(errors.sellingPrice && touched.sellingPrice)}
                            helperText={(errors.sellingPrice && touched.sellingPrice) && errors.sellingPrice}
                            value={values.sellingPrice}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            label='MRP'
                            required
                            name="mrp"
                            type="number"
                            error={!!(errors.mrp && touched.mrp)}
                            helperText={(errors.mrp && touched.mrp) && errors.mrp}
                            value={values.mrp}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            label='Tax (in %)'
                            required
                            name="tax"
                            type="number"
                            slotProps={{
                                htmlInput: {
                                    min: 0,
                                    max: 100
                                }
                            }}
                            error={!!(errors.tax && touched.tax)}
                            helperText={(errors.tax && touched.tax) && errors.tax}
                            value={values.tax}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <div className="flex justify-end gap-3">
                            <Button onClick={handleClose} variant="contained" color="info">Cancel</Button>
                            <Button type="submit" variant="contained">Update</Button>
                        </div>
                    </Box>
                </DialogContent>
            </form>
        </Dialog>
    )
}