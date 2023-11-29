import React,{useState} from 'react'

import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useFormik } from 'formik';
import { loginSchema } from '../../yup/validation';
import { GenerateError } from '../../toast/GenerateError';
import { adminLogin } from '../../api/adminApi';

function Login() {

    const[value,setValue] = useState({email:'', password:''})
    const navigate = useNavigate()
    const initialValues = {
        email : '',
        password : ''
    }


    const{
        values,
        errors,
        touched,
        handleSubmit,
        handleBlur,
        handleChange,
        setFieldValue,
    }=useFormik({
        initialValues : initialValues,
        validationSchema : loginSchema,
        onSubmit : async(values)=>{
            const response = await adminLogin(values)
            if(response.data.access){
                localStorage.setItem('currentAdmin',response.data.token)
                navigate('/admin')
            }else{
                GenerateError(response.data.message)
            }
        }
    })

  
  return (
    <>

<div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#37474f] to-[#bcaaa4]">      

   
    <div className="flex justify-center items-center h-screen">
    <div className="w-full max-w-[48rem] p-4 ">  
      <div className="bg-[#757575] rounded-none overflow-hidden  p-10  ">
        <Card className='bg-[#757575]'  shadow={false}>
          <Typography variant="h4"color="blue-gray">
            Login
          </Typography>
          {/* <Typography color="white" className="mt-1 font-normal">
            Enter your details to register.
          </Typography> */}
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-6">
             
              <Input size="lg" placeholder='email' name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email} />
               {touched.email && errors.email && (
                    <div className="text-red-500 text-sm ">{errors.email}</div>
                  )}
             
              <Input type="password" size="lg" placeholder='password'  name='password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password} />
             {touched.password && errors.password && (
                    <div className="text-red-500 text-sm ">{errors.password}</div>
                  )}
            </div>
     
            <Button className="mt-6 bg-[#455a64]" fullWidth  type='submit'>
              Login
            </Button>
            {/* <Typography color="gray" className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <Link  className="font-medium text-gray-900">
                Sign In
              </Link>
            </Typography> */}
          </form>
        </Card>
      </div>
      </div>
    </div>
    </div>

    </>
  );
}

export default Login;
