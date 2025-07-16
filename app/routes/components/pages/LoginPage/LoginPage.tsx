import { useNavigate } from "react-router"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import LoginImage from './components/images/login-image.png'
import { Button, TextField } from "@mui/material";
import ArrowRight from '@mui/icons-material/ArrowForwardIosOutlined';


export default function LoginPage() {

    const navigate = useNavigate()

    const validationSchema = Yup.object({
        username: Yup.string().min(4, 'Username must be at least 4 characters').max(20, 'Username must not exceed 20 characters').required('Username is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    })

    const { values,
        touched,
        errors,
        isValid,
        handleBlur,
        handleChange,
        handleSubmit
    } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: () => {
            navigate('/dashboard')
        },
        validationSchema: validationSchema
    });

    return (
        <div className="bg-white h-screen lg:flex">

            <div className="w-[50%] hidden lg:flex justify-center items-center lg:h-full bg-gray-200">
                <img src={LoginImage} alt="" className="w-full h-full" />
            </div>

            <div className="bg-white h-full lg:w-[50%] lg:grid place-items-center">
                {/* <header className="lg:hidden flex justify-center items-center h-[20%]">
                    <h1 className="font-bold text-4xl text-black">LOGO</h1>
                </header> */}

                <div className=" h-full w-full lg:w-9/16 pt-15 flex flex-col justify-center items-center lg:items-start">

                    <header className=" flex flex-col justify-center items-center lg:items-start gap-2 mb-10">
                        <h1 className="font-bold text-4xl text-black">Log In</h1>
                        <p className="text-gray-500">Please fill your details below to Login</p>
                    </header>

                    <form onSubmit={handleSubmit} className="flex flex-col lg:justify-center gap-7 w-3/4 lg:w-full">

                        <TextField
                            error={!!(errors.username && touched.username)}
                            helperText ={(errors.username && touched.username) && errors.username}
                            label="Username"
                            type="text"
                            name="username"
                            value={values.username}
                            onBlur={handleBlur}
                            onChange={handleChange}>
                        </TextField>

                        <TextField
                            error={!!(errors.password && touched.password)}
                            helperText ={(errors.password && touched.password) && errors.password}
                            label="Password"
                            type="password"
                            name="password"
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={handleChange}>
                        </TextField>

                        <div className="text-end w-full flex items-end justify-end">
                            <a href="#" className="no-underline hover:text-blue-500 text-black">Forgot Password?</a>
                        </div>

                        <div className="flex justify-center lg:justify-end items-end w-full mt-1 lg:mt-3">
                            <Button disabled={!isValid || !values.username || !values.password} type="submit" variant="contained" sx={{ fontSize: '22px' }} className="rounded-lg text-white w-full lg:w-1/2">Login <ArrowRight /></Button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}