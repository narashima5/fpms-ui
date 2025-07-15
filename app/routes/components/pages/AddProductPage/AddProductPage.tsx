import { Button, TextField } from "@mui/material"
import { useFormik } from "formik"
import { useNavigate } from "react-router";
import * as Yup from 'yup'

interface InitialValuesProps {
    productName: string;
    brandName: string;
    sellingPrice: number;
    mrp: number;
    hsn: string;
    category: string;
    tax: number;
}

export default function AddProductPage() {

    const navigate = useNavigate()

    const initialValues: InitialValuesProps = {
        productName: '',
        brandName: '',
        sellingPrice: 0,
        mrp: 0,
        hsn: '',
        category: '',
        tax: 0
    }

    const validationSchema = Yup.object({
        productName: Yup.string().required("Required Field"),
        brandName: Yup.string().required("Required Field"),
        sellingPrice: Yup.number().required("Required Field"),
        mrp: Yup.number().required("Required Field"),
        hsn: Yup.string().required("Required Field"),
        category: Yup.string().required("Required Field"),
        tax: Yup.number().required("Required Field"),
    })

    const {
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
            alert("Product Added");
            navigate('/products');
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
                        id="productName"
                        name="productName"
                        error={!!(errors.productName && touched.productName)}
                        helperText={(errors.productName && touched.productName) && errors.productName}
                        value={values.productName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        label='Brand Name'
                        id="brandName"
                        name="brandName"
                        error={!!(errors.brandName && touched.brandName)}
                        helperText={(errors.brandName && touched.brandName) && errors.brandName}
                        value={values.brandName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        label='Category'
                        id="category"
                        name="category"
                        error={!!(errors.category && touched.category)}
                        helperText={(errors.category && touched.category) && errors.category}
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        label='HSN'
                        id="hsn"
                        name="hsn"
                        error={!!(errors.hsn && touched.hsn)}
                        helperText={(errors.hsn && touched.hsn) && errors.hsn}
                        value={values.hsn}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        label='Selling Price'
                        id="sellingPrice"
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
                        id="mrp"
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
                        id="tax"
                        name="tax"
                        type="number"
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