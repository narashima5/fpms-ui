import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useFormik } from "formik"
import { useNavigate } from "react-router";
import * as Yup from 'yup'
import { addProduct } from "~/Services/storage/Product";

interface ProductDetailsProps {
    productName: string;
    brandName: string;
    sellingPrice: string;
    mrp: string;
    hsn: string;
    category: string;
    tax: string;
}

export default function AddProductPage() {

    const CategoryMenu = [
        'Fertilizers',
        'Pesticides',
        'Seeds'
    ]

    const navigate = useNavigate()

    const initialValues = {
        productName: '',
        brandName: '',
        sellingPrice: '',
        mrp: '',
        hsn: '',
        category: '',
        tax: ''
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
        handleChange,
        handleBlur
    } = useFormik<ProductDetailsProps>({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const formattedValue = {
                ...values,
                sellingPrice : Number(values.sellingPrice),
                mrp : Number(values.mrp),
                tax : Number(values.tax)
            }
            await addProduct(formattedValue).then(
                () => {
                    navigate('/products');
                },
            )
            .catch((err) => console.log(err)
            )

        }
    })


    const handleCancel = () => {
        navigate('/products');

    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-15">
                <div>
                    <h1 className="text-4xl">Add a product</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center w-3/4 lg:w-1/2 gap-6">
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
                </div>
                <div className="flex gap-3 justify-center lg:justify-end w-3/4 lg:w-1/2">
                    <Button color="info" variant="contained" onClick={handleCancel}>Cancel</Button>
                    <Button type="submit" variant="contained">Add Product</Button>
                </div>
            </form>
        </div>
    )
}