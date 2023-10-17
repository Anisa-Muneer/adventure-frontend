import React, {useState} from 'react'
import {Link, useNavigate } from 'react-router-dom';
import {useFormik} from 'formik'

import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { signupSchema } from '../../yup/validation';
import { userSignup } from '../../api/userApi';
import { GenerateError, GenerateSuccess } from '../../toast/GenerateError';
import { ToastContainer } from 'react-toastify';

function Signup() {
    const navigate = useNavigate()
    const[value,setValue] = useState({name:'', email:'', mobile:'', password:''})

    const initialValues = {
      name : "",
      email : "",
      mobile : "",
      password : ""
    }

    const {
      values,
      errors,
      touched,
      handleBlur,
      handleSubmit,
      handleChange
    } = useFormik({
      initialValues : initialValues,
      validationSchema : signupSchema,
      onSubmit : async(values, {resetForm})=>{
        console.log('fffffffffffffffffffffffffffff');
        const response = await userSignup(values)
        console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjj');
        if(response.data.created){
          resetForm(initialValues);
          GenerateSuccess(response.data.message)
        }else{
          resetForm(initialValues);
          GenerateError(response.data.message)
        }
      }
      
    })


  return (
    <>

     <div
       className="min-h-screen flex items-center justify-center bg-cover bg-center"
       style={{
       backgroundImage: "url('data:image/jpeg;base64,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')",
       }}
     >
      

   
    <div className="flex justify-center items-center h-screen">
    <div className="w-full max-w-[48rem] p-4 ">  
      <div className="bg-transparent shadow-lg rounded-none overflow-hidden  p-10  ">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="Name" name='name'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}/>
               {touched.name && errors.name && (
                    <div className="text-red-500 text-sm ">{errors.name}</div>
                  )}
              <Input size="lg" label="Email" name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}/>
               {touched.email && errors.email && (
                    <div className="text-red-500 text-sm ">{errors.email}</div>
                  )}
              <Input size="lg" label="Mobile" name='mobile'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.mobile}/>
               {touched.mobile && errors.mobile && (
                    <div className="text-red-500 text-sm ">{errors.mobile}</div>
                  )}
              <Input type="password" size="lg" label="Password" name='password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}/>
               {touched.password && errors.password && (
                    <div className="text-red-500 text-sm ">{errors.password}</div>
                  )}
            </div>
     
            <Button className="mt-6  bg-[#455a64]" fullWidth type='submit' >
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to={'/login'} className="font-medium text-gray-900">
                Sign In
              </Link>  
              
            </Typography>
          </form>
        </Card>
      </div>
      </div>
    </div>
    </div>
    <ToastContainer/>
   
    </>
  );
}

export default Signup;
