import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchema } from '../../yup/validation'
import { adventureLogin } from '../../api/adventureApi'
import { useDispatch } from 'react-redux'
import { setadventuredetails } from '../../Redux/AdventureSlice'
import { GenerateError } from '../../toast/GenerateError'
import {
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import { ToastContainer } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'

function Login() {
  const [value, setValue] = useState({ email: '', password: '' })
  const [guser, setGUser] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialValues = {
    email: '',
    password: '',
    image: ""

  }

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const response = await adventureLogin(values)
      if (response.data.access) {
        const adventureDetails = {
          id: response.data.adventure._id,
          name: response.data.adventure.name,
          email: response.data.adventure.email,
          image: response.data.adventure.image ? response.data.adventure.image : ""
        }
        localStorage.setItem('currentAdventure', response.data.token)
        dispatch(setadventuredetails({ adventureInfo: adventureDetails }))
        navigate('/adventure')

      } else {
        GenerateError(response.data.message)
      }
    }
  })

  const Glogin = useGoogleLogin({
    onSuccess: (codeResponse) => setGUser(codeResponse),
    onError: (error) => console.log('Login Failed', error)
  })

  useEffect(
    () => {
      if (guser) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`, {
            headers: {
              Authorization: `Bearer ${guser.access_token}`,
              Accept: 'appication/json'
            }
          })
          .then((res) => {
            adventureLogin({ email: res.data.email, password: res.data.id }).then((response) => {
              if (response.data.access) {
                const adventureDetails = {
                  name: response.data.adventure.name,
                  email: response.data.adventure.email,
                  id: response.data.adventure._id,
                }
                dispatch(setadventuredetails({ adventureInfo: adventureDetails }))
                localStorage.setItem("currentAdventure", response.data.token)

                navigate('/adventure')
              } else {
                GenerateError(response.data.message)
              }
            })
          })
          .catch((err) => console.log(err))
      }
    },
    [guser]
  )


  return (
    <>

      <div className="bg-white bg-cover min-h-screen flex flex-col items-center justify-center">
        <div className=" just bg-[]  md:flex md:h-3/4 rounded-xl bg-no-repeat" style={{ backgroundSize: 'cover', backgroundPosition: 'fill' }}>
          <div className="flex flex-col justify-center items-center LoginLeft bg-[#588157]  text-white py-8 px-4 text-center md:w-1/2 rounded-tl-xl md:rounded-bl-xl">
            <img className="w-44 h-44 mx-auto" />
            <div className='w-96 flex justify-center mt-5'>
              <p className="text-2xl md:text-2xl">Are You New Here?</p>
            </div>
            <br />
            <button
              onClick={() => navigate("/adventure/signup")}
              className="w-32 h-12 bg-[#a8f5af] hover:bg-[#13453a] text-white rounded-3xl focus:outline-none"
            >
              Signup
            </button>
          </div>
          <div className="LoginForm bg-gray-200 p-6 md:p-16 md:w-1/2 rounded-xl py-9 flex align-middle" style={{ height: '580px' }}>
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
                  className="bg-[#588157] hover:bg-[#13453a] text-white py-2 rounded-md"
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
      <ToastContainer />

    </>

  )
}

export default Login
