import React,{useEffect, useState} from 'react'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import App from '../../App';

import {
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import { loginSchema } from '../../yup/validation';
import { userLogin } from '../../api/userApi';
import { useDispatch } from 'react-redux';
import { setuserdetails } from '../../Redux/UserSlice';
import { GenerateError } from '../../toast/GenerateError';
import { ToastContainer } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';




function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const[value,setValue] = useState({email:'',password:''})
  const[guser,setGUser] = useState([])
  const initialValues = {
    email:'',
    password:'',
    image : ''
  }

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
  }=useFormik({
    initialValues : initialValues,
    validationSchema : loginSchema,
    onSubmit: async(values)=>{
      const response = await userLogin(values)
      if(response.data.access){
        const userDetails = {
          name:response.data.user.name,
          email:response.data.user.email,
          image:response.data.user.image,
          id:response.data.user._id
        }
        dispatch(setuserdetails({userInfo:userDetails}))
        localStorage.setItem("currentUser",response.data.token)
        navigate('/')

      }else{
        GenerateError(response.data.message)
      }

    }
  })

  const Glogin = useGoogleLogin({
    onSuccess : (codeResponse)=>setGUser(codeResponse),
    onError : (error)=>console.log('Login Failed',error)
  })

  useEffect(
    ()=>{
      if(guser){
        axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`,{
          headers:{
            Authorization : `Bearer ${guser.access_token}`,
            Accept : 'appication/json'
          }
        })
        .then((res)=>{
          userLogin({email:res.data.email,password:res.data.id}).then((response)=>{
            if(response.data.access){
              const userDetails = {
                name:response.data.user.name,
                email:response.data.user.email,
                id:response.data.user._id,
              }
              dispatch(setuserdetails({userInfo : userDetails}))
              localStorage.setItem("currentUser",response.data.token)
              
              navigate('/')
            }else{
              GenerateError(response.data.message)
            }
          })
        })
        .catch((err)=>console.log(err))
      }
    },
    [guser]
  )

  
  return (
   
    <>

    <div className="bg-white bg-cover min-h-screen flex flex-col items-center justify-center">
    <div className="LoginContainer bg-[url('https://img.freepik.com/free-photo/two-athletic-man-floats-red-boat-river_1153-3727.jpg?size=626&ext=jpg&ga=GA1.1.1183943231.1684163071&semt=sph')]  md:flex md:h-3/4 rounded-xl">
    <div className="LoginLeft flex flex-col items-center justify-center bg-[#064e3b] shadow-lg opacity-70 text-white py-8 px-4 text-center md:w-1/2 rounded-tl-xl md:rounded-bl-xl">
                <img className="w-44 h-44 mx-auto" />
                <div className='w-96 flex justify-center mt-5'>
                  <p className="text-2xl md:text-2xl">Are You New Here?</p>
                </div>
                <br />
                <button
                  onClick={() => navigate("/signup")}
                  className="w-32 h-12 bg-[#6ee7b7] hover:bg-[#4ade80] text-white rounded-3xl focus:outline-none"
                >
                  Signup
                </button>
              </div>
              <div className="LoginForm bg-gray-200 p-6 md:p-16 md:w-1/2 rounded-xl py-9 flex align-middle" style={{height:'580px'}}>
                <div className='flex justify-center flex-col items-center'>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              
                  <Input size="lg" label="Email" name='email' id='email' variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {
                    touched.email && errors.email && (
                        <div className='text-red-500 text-sm' >{errors.email} </div>
                    )
                  }
                              

                  <Input size="lg" label="Password" type='password' name='password' id='password' variant="standard" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                   {
                    touched.password && errors.password && (
                        <div className='text-red-500 text-sm'> {errors.password} </div>
                    )
                  }
    
    <Checkbox 
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    I agree the
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-gray-900"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
                 
                 
                  <button
                    type="submit"
                    className="bg-[#6ee7b7] hover:bg-[#4ade80] text-white py-2 rounded-md"
                  >
                    Login
                  </button>
                  {/* <a onClick={() => navigate("/lawyer/register")}>
                    Are you a lawyer?
                  </a> */}
                </form>
                <div className="flex items-center justify-center py-6">
                  <div className="border-t border-gray-700 flex-grow h-0"></div>
                  <div className="mx-2 text-gray-800">OR</div>
                  <div className="border-t border-gray-700 flex-grow h-0"></div>
                </div>
                <div className="flex justify-center">
                <FcGoogle className="w-6 h-6" />
                  <a onClick={() => Glogin()} className="px-2">
                    Login with Google
                  </a>
                </div>
              </div>
              </div>
            </div>
          </div>
        <ToastContainer/>
       
        </>

    
  );
}

export default Login;
