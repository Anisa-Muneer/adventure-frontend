import React, {useEffect, useState} from 'react'
import {Link, useNavigate } from 'react-router-dom';
import {useFormik} from 'formik'
import {
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import { signupSchema } from '../../yup/validation';
import { UserSignupWithGoogle, userSignup } from '../../api/userApi';
import { GenerateError, GenerateSuccess } from '../../toast/GenerateError';
import { ToastContainer } from 'react-toastify';
import { FcGoogle} from 'react-icons/fc'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setuserdetails } from '../../Redux/UserSlice';


function Signup() {
    const navigate = useNavigate()
    const[value,setValue] = useState({name:'', email:'', mobile:'', password:''})
    const [guser,setGUser] = useState([])
    const dispatch =useDispatch()

    const initialValues = {
      name : "",
      email : "",
      mobile : "",
      password : "",
      image : ""
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
        console.log(values);
        const response = await userSignup(values)
        if(response.data.created){
          resetForm(initialValues);
          GenerateSuccess(response.data.message)
        }else{
          resetForm(initialValues);
          GenerateError(response.data.message)
        }
      }
      
    })

    const Gsignup = useGoogleLogin({
      onSuccess: (codeResponse) => setGUser(codeResponse),
      onError: (error) => console.log('Signup Failed:', error)
    })


    useEffect(
      () => {
          if (guser) {
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${guser.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                    console.log(res);
                    UserSignupWithGoogle(res.data).then((response)=>{
                      if(response.data.created){
                        console.log(response);
                        const userDetails = {
                          name:response.data.user.name,
                          email:response.data.user.email,
                        }
                        localStorage.setItem("currentUser",response.data.token)
                        dispatch(setuserdetails({userInfo : userDetails}))
                        navigate('/')
                      }else{
                        GenerateError(response.data.message)
                      }
                    })
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ guser ]
    );


  return (
    <>

<div className="bg-white bg-cover min-h-screen flex flex-col items-center justify-center">
        <div className="LoginContainer bg-[url('https://img.freepik.com/free-photo/two-athletic-man-floats-red-boat-river_1153-3727.jpg?size=626&ext=jpg&ga=GA1.1.1183943231.1684163071&semt=sph')]  md:flex md:h-3/4 rounded-xl">
          <div className="LoginLeft flex flex-col items-center justify-center bg-[#064e3b] shadow-lg opacity-70 text-white py-8 px-4 text-center md:w-1/2 rounded-tl-xl md:rounded-bl-xl">
            <img className="w-44 h-44 mx-auto" />
            <div className='w-96 flex justify-center mt-5'>
                  <p className="text-2xl md:text-2xl">Already have an account?</p>
                </div>
            <br />
            <button
              onClick={() => navigate("/login")}
              className="w-32 h-12 bg-[#6ee7b7] hover:bg-[#4ade80] text-white rounded-3xl focus:outline-none"
            >
              Login
            </button>
          </div>
          <div className="LoginForm bg-gray-200 p-6 md:p-16 md:w-1/2 rounded-xl">
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <Input size="lg" label="Name" name='name' id='name' variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
               {touched.name && errors.name && (
                      <div className="text-red-500 text-sm ">{errors.name}</div>
                    )}
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
              <Input size="lg" label="Mobile" name='mobile' id='mobile' variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.mobile}
              />
              {
                touched.mobile && errors.mobile && (
                    <div className='text-red-500 text-sm'> {errors.mobile} </div>
                )
              }
              <Input size="lg" label="Password"  type='password' name='password' id='password' variant="standard" 
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
                Sign up
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
              <a onClick={() => Gsignup()} className="px-2">
                Signin with Google
              </a>
            </div>
          </div>
        </div>
      </div>
    <ToastContainer/>
   
    </>
  );
}

export default Signup;
